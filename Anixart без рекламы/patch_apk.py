import os
import re

base_dir = r'c:\Antsgravity\Anime_app\anixart_decompiled'

# 1. Modify activity_main.xml files
layout_files = [
    r'res\layout\activity_main.xml',
    r'res\layout-w600dp-port\activity_main.xml',
    r'res\layout-w960dp-land\activity_main.xml'
]

for lf in layout_files:
    full = os.path.join(base_dir, lf)
    if os.path.exists(full):
        with open(full, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content = content.replace(
            '<RelativeLayout android:id="@id/mAdViewLayout" android:background="@android:color/transparent" android:layout_width="fill_parent" android:layout_height="50.0dip">',
            '<RelativeLayout android:id="@id/mAdViewLayout" android:visibility="gone" android:background="@android:color/transparent" android:layout_width="fill_parent" android:layout_height="0.0dip">'
        )
        with open(full, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Patched {lf}')

# 2. Modify preference_main.xml
pref_main = os.path.join(base_dir, r'res\xml\preference_main.xml')
if os.path.exists(pref_main):
    with open(pref_main, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'\s*<Preference[^>]*android:key="ad_preferences"[^>]*/>', '', content)
    with open(pref_main, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Patched preference_main.xml')

# 3. Patch MainPreferenceFragment.smali
main_pref_smali = os.path.join(base_dir, r'smali_classes3\com\swiftsoft\anixartd\ui\fragment\main\preference\MainPreferenceFragment.smali')
if os.path.exists(main_pref_smali):
    with open(main_pref_smali, 'r', encoding='utf-8') as f:
        content = f.read()
    old_target = '    iput-object v1, v7, Landroidx/preference/Preference;->lI1lll1lII:Landroidx/preference/Preference$OnPreferenceClickListener;'
    new_target = '''    if-eqz v7, :cond_ad_null
    invoke-virtual {v1, v7}, Landroidx/preference/PreferenceGroup;->l111IlI1I(Landroidx/preference/Preference;)V
    iput-object v1, v7, Landroidx/preference/Preference;->lI1lll1lII:Landroidx/preference/Preference$OnPreferenceClickListener;
    :cond_ad_null'''
    if old_target in content:
        content = content.replace(old_target, new_target)
        with open(main_pref_smali, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Patched MainPreferenceFragment.smali')
    else:
        print('WARNING: old_target not found in MainPreferenceFragment.smali!')

# 4. Patch MainActivity.smali
main_act_smali = os.path.join(base_dir, r'smali_classes3\com\swiftsoft\anixartd\ui\activity\MainActivity.smali')
if os.path.exists(main_act_smali):
    with open(main_act_smali, 'r', encoding='utf-8') as f:
        content = f.read()
    old_code = 'invoke-virtual {v0}, Lcom/swiftsoft/anixartd/ui/activity/MainActivity;->II1II1llll()Lcom/swiftsoft/anixartd/presentation/main/MainPresenter;'
    new_code = 'goto :goto_b\n    invoke-virtual {v0}, Lcom/swiftsoft/anixartd/ui/activity/MainActivity;->II1II1llll()Lcom/swiftsoft/anixartd/presentation/main/MainPresenter;'
    if old_code in content:
        content = content.replace(old_code, new_code, 1)
        with open(main_act_smali, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Patched MainActivity.smali')

# 5. Patch EpisodesFragment.smali
episodes_smali = os.path.join(base_dir, r'smali_classes3\com\swiftsoft\anixartd\ui\fragment\main\episodes\EpisodesFragment.smali')
if os.path.exists(episodes_smali):
    with open(episodes_smali, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Patch I1lII11Il1
    content = re.sub(r'(\.method public final I1lII11Il1\(\)V\n\s+\.locals \d+)', r'\1\n    return-void', content)
    # Patch llIlllllll
    content = re.sub(r'(\.method public final llIlllllll\(\)V\n\s+\.locals \d+)', r'\1\n    return-void', content)
    # Patch onShowKodikAd
    content = re.sub(r'(\.method public final onShowKodikAd\([^\)]+\)V\n\s+\.locals \d+)', r'\1\n    return-void', content)
    
    with open(episodes_smali, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Patched EpisodesFragment.smali')

# 6. Patch TogglesResponse.smali
toggles_smali = os.path.join(base_dir, r'smali_classes3\com\swiftsoft\anixartd\network\response\config\TogglesResponse.smali')
if os.path.exists(toggles_smali):
    with open(toggles_smali, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # getAdBannerBlockId
    content = re.sub(
        r'(\.method public final getAdBannerBlockId\(\)Ljava/lang/String;\n\s+\.locals \d+\n)(.*?)\.end method',
        r'\1    const-string v0, ""\n    return-object v0\n.end method',
        content, flags=re.DOTALL
    )
    # getAdInterstitialBlockId
    content = re.sub(
        r'(\.method public final getAdInterstitialBlockId\(\)Ljava/lang/String;\n\s+\.locals \d+\n)(.*?)\.end method',
        r'\1    const-string v0, ""\n    return-object v0\n.end method',
        content, flags=re.DOTALL
    )
    # getKodikIframeAd
    content = re.sub(
        r'(\.method public final getKodikIframeAd\(\)Z\n\s+\.locals \d+\n)(.*?)\.end method',
        r'\1    const/4 v0, 0x0\n    return v0\n.end method',
        content, flags=re.DOTALL
    )
    # getKodikAdIframeUrl
    content = re.sub(
        r'(\.method public final getKodikAdIframeUrl\(\)Ljava/lang/String;\n\s+\.locals \d+\n)(.*?)\.end method',
        r'\1    const-string v0, ""\n    return-object v0\n.end method',
        content, flags=re.DOTALL
    )
    
    with open(toggles_smali, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Patched TogglesResponse.smali')

# 7. Update assets/adblock.txt
adblock_txt = os.path.join(base_dir, r'assets\adblock.txt')
if os.path.exists(adblock_txt):
    extra_domains = [
        'samara.dom.ru', 'rabota.vtb.ru', 'msctod234.ru',
        'an.yandex.ru', 'yabs.yandex.ru', 'adfox.ru', 'mytarget.ru',
        'googlesyndication.com', 'doubleclick.net', 'googleadservices.com'
    ]
    with open(adblock_txt, 'r', encoding='utf-8') as f:
        existing = set(line.strip() for line in f if line.strip())
    new_domains = [d for d in extra_domains if d not in existing]
    if new_domains:
        with open(adblock_txt, 'a', encoding='utf-8') as f:
            f.write('\n' + '\n'.join(new_domains) + '\n')
        print(f'Added {len(new_domains)} extra domains to adblock.txt')

print('All patches applied successfully!')
