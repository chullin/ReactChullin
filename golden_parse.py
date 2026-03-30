import re

def parse(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_text = f.read()
        
    # Manual String Replacements completely destroying the block parsing bugs
    raw_text = raw_text.replace(
        "853. 尺 ruler 856. 安全的\n857. 航行\n858. 沙拉\nsafe\nsail\nsalad",
        "853. 尺\nruler\n856. 安全的\nsafe\n857. 航行\nsail\n858. 沙拉\nsalad"
    )
    
    raw_text = raw_text.replace(
        "1104. 十二\ntwelve\n1106. 第二十(的)\n1107. 兩次\n1108. 二 two 1109. 打字\ntwentieth\ntwice\ntype",
        "1104. 十二\ntwelve\n1106. 第二十(的)\ntwentieth\n1107. 兩次\ntwice\n1108. 二\ntwo\n1109. 打字\ntype"
    )
    
    lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
    
    ch_pattern = re.compile(r'^(\d+)\.\s*(.+)')
    exclude_pattern = re.compile(r'教育部國中小基本英語字彙')
    
    pairs = []
    current_ch = []
    current_en = []
    state = 'EXPECT_EN'
    
    def finalize_group():
        nonlocal current_ch, current_en
        if not current_ch and not current_en: return
        
        ch_nums = [c[0] for c in current_ch]
        
        if 116 in ch_nums and 117 in ch_nums and current_en == ['bored']: current_en = ['borrow', 'boss']
        if 118 in ch_nums and 'borrow' in current_en and 'boss' in current_en: current_en = ['both']
        if 171 in ch_nums and 'chalk' in current_en and 'cent' in current_en: current_en = ['chalk']
        if 155 in ch_nums and current_en == ['cap', 'cap']: current_en = ['cap']
        if 322 in ch_nums and 'everybody' in current_en: current_en.remove('everybody')
        if 959 in ch_nums and 'somebody' in current_en: current_en.remove('somebody')
        if 1006 in ch_nums:
            if 't' in current_en: current_en.remove('t')
            if 'supermarke' in current_en: current_en[current_en.index('supermarke')] = 'supermarket'
        if 1056 in ch_nums: current_en = ['this', 'throat', 'throw']
        if 1059 in ch_nums: current_en = ['those']
        if 1035 in ch_nums: current_en = ['tenth']
            
        for i in range(min(len(current_ch), len(current_en))):
            pairs.append({
                "num": current_ch[i][0],
                "word": current_en[i],
                "definition": current_ch[i][1]
            })
            
        current_ch = []
        current_en = []

    for line in lines:
        if exclude_pattern.search(line): continue
            
        match = ch_pattern.match(line)
        if match:
            if state == 'EXPECT_EN' and len(current_en) > 0: finalize_group()
            state = 'EXPECT_CH'
            current_ch.append((int(match.group(1)), match.group(2).strip()))
        else:
            state = 'EXPECT_EN'
            if line == "roller-blade": continue 
            elif line == "skate/blade":
                if current_en and current_en[-1] == "roller-":
                    current_en[-1] = "roller-skate/blade"
            elif line == "zoo.": current_en.append("zoo")
            else: current_en.append(line)
                
    finalize_group()
    
    final_pairs = []
    seen = set()
    for p in pairs:
        if p["num"] not in seen:
            seen.add(p["num"])
            final_pairs.append(p)
            
    final_pairs.sort(key=lambda x: x["num"])
    
    print(len(final_pairs))
    nums = [p['num'] for p in final_pairs]
    for i in range(1, 1201):
        if i not in nums: print("Missing:", i)

    ts_content = "import { DifficultyCategory } from '../wordData';\n\n"
    ts_content += "export const elementaryAll1200: DifficultyCategory = {\n"
    ts_content += "  id: 'elementary',\n"
    ts_content += "  title: '簡單 (國小 1200)',\n"
    ts_content += "  description: '國中小基本英語字彙 1200 字。',\n"
    ts_content += "  icon: 'Baby',\n"
    ts_content += "  color: 'tw-bg-blue-500',\n"
    ts_content += "  words: [\n"
    
    for p in final_pairs:
        ts_content += f'    {{ word: "{p["word"].replace(chr(34), "")}", definition: "{p["definition"].replace(chr(34), "")}" }},\n'
        
    ts_content += "  ]\n};\n"
    
    with open('data/elementary/elementaryAll1200.ts', 'w', encoding='utf-8') as out:
        out.write(ts_content)

parse('data/elementary/elementary_1200.md')
