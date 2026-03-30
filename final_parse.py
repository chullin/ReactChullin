import re
import json

def generate_perfect_1200(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]
        
    ch_pattern = re.compile(r'^(\d+)\.\s*(.+)')
    exclude_pattern = re.compile(r'教育部國中小基本英語字彙')
    
    chinese_list = []
    english_list = []
    
    # We will just parse them into two independent lists, 
    # BUT we will explicitly avoid appending the known bad duplicated/artifact lines.
    
    # We track if we've seen certain words to avoid duplicates if they shouldn't be repeated immediately.
    # But it's safer to just skip specific occurrences.
    
    # Let's clean the lines first
    clean_lines = []
    for line in lines:
        if exclude_pattern.search(line): continue
        if line == "t": continue # artifact near supermarket
        
        # fix 853 and 1108
        if "853. 尺 ruler 856. 安全的" in line:
            clean_lines.extend(["853. 尺", "ruler", "856. 安全的"])
            continue
        if "1108. 二 two 1109. 打字" in line:
            clean_lines.extend(["1108. 二", "two", "1109. 打字"])
            continue
            
        clean_lines.append(line)
        
    for i, line in enumerate(clean_lines):
        match = ch_pattern.match(line)
        if match:
            num = int(match.group(1))
            meaning = match.group(2).strip()
            
            # 116. 借入 in PDF has an extra "bored" before it. The English words just flow.
            # We don't need to filter chinese.
            chinese_list.append((num, meaning))
        else:
            # English word filtering
            # We know exact duplicates in copy paste:
            if line == "bored" and english_list.count("bored") == 1: continue
            if line == "cent" and english_list.count("cent") == 1: continue
            if line == "cap" and english_list.count("cap") == 1: continue
            if line == "everybody" and english_list.count("everybody") == 1: continue
            if line == "somebody" and english_list.count("somebody") == 1: continue
            if line == "supermarke":
                line = "supermarket"
            if line == "thirteenth" and english_list.count("thirteenth") == 1: continue
            if line == "tenth" and english_list.count("tenth") == 1: continue
            
            # fix roller-blade
            if line == "roller-":
                line = "roller-skate/blade"
            elif line == "skate/blade" or line == "roller-blade":
                continue
                
            english_list.append(line)
            
    # Now check counts
    print(f"Chinese: {len(chinese_list)}")
    print(f"English: {len(english_list)}")
    
    if len(chinese_list) == len(english_list):
        pairs = []
        for i in range(len(chinese_list)):
            pairs.append({
                "num": chinese_list[i][0],
                "word": english_list[i],
                "definition": chinese_list[i][1]
            })
            
        pairs.sort(key=lambda x: x["num"])
        
        # Write output
        ts_content = "import { DifficultyCategory } from '../wordData';\n\n"
        ts_content += "export const elementaryAll1200: DifficultyCategory = {\n"
        ts_content += "  id: 'elementary',\n"
        ts_content += "  title: '簡單 (國小 1200)',\n"
        ts_content += "  description: '國中小基本英語字彙 1200 字。',\n"
        ts_content += "  icon: 'Baby',\n"
        ts_content += "  color: 'tw-bg-blue-500',\n"
        ts_content += "  words: [\n"
        
        for p in pairs:
            word = p['word'].replace('"', '\\"')
            definition = p['definition'].replace('"', '\\"')
            ts_content += f'    {{ word: "{word}", definition: "{definition}" }},\n'
            
        ts_content += "  ]\n};\n"
        
        with open('data/elementary/elementaryAll1200.ts', 'w', encoding='utf-8') as out:
            out.write(ts_content)
        print("Success! Generated true 1200 words!")
    else:
        print("Still mismatched. Needs more debugging.")

generate_perfect_1200('data/elementary/elementary_1200.md')
