import re
import json

def build_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    chinese_list = []
    english_list = []
    
    # regex for getting out cases like "853. 尺 ruler 856. 安全的"
    ch_pattern = re.compile(r'^(\d+)\.\s*(.+)')
    exclude_pattern = re.compile(r'教育部國中小基本英語字彙')
    
    for line in lines:
        line = line.strip()
        if not line: continue
        if exclude_pattern.search(line): continue
        
        # Manually fix specific lines
        if "853. 尺 ruler 856. 安全的" in line:
            chinese_list.append((853, "尺"))
            english_list.append("ruler")
            chinese_list.append((856, "安全的"))
            continue
            
        if "1108. 二 two 1109. 打字" in line:
            chinese_list.append((1108, "二"))
            english_list.append("two")
            chinese_list.append((1109, "打字"))
            continue
            
        if line == "roller-":
            english_list.append("roller-skate/blade")
            continue
        if line == "skate/blade":
            continue
        if line == "roller-blade":
            continue # Repeated or extra
            
        match = ch_pattern.match(line)
        if match:
            meaning = match.group(2).strip()
            num = int(match.group(1))
            
            # Check for english at the end of Chinese string (like "167. 〈一〉分錢 cent")
            # Wait, earlier we saw it was just a regular line: "167. 〈一〉分錢" followed later by "cent". Let's not auto-split unless we are sure.
            # In the debug script, did it find any mixed lines? No.
            chinese_list.append((num, meaning))
        else:
            english_list.append(line)
            
    # Fix repetitions
    # Sometimes english words are listed again or out of order
    print(f"Chinese elements: {len(chinese_list)}")
    print(f"English elements: {len(english_list)}")
    
    # We want to pair exactly 1 to 1200. Let's create a mapping based on the order of discovery.
    # The English words seem to be in blocks.
    # Wait, instead of trying to map by order, let's just zip them IF lengths match.
    # If they don't, we can try to find them by index. 
    pairs = []
    for i in range(min(len(chinese_list), len(english_list))):
       pairs.append({
           "word": english_list[i],
           "definition": chinese_list[i][1]
       })
       
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

build_data('data/elementary/elementary_1200.md')
