/**
 * Taiwan MOFA-style Pinyin (Diplomatic/Passport Style)
 * Standard Hanyu Pinyin with capitalized syllable-initials and hyphenation.
 */
const pinyinMap: Record<string, string> = {
  // --- Numbers & Basics ---
  '零': 'Ling', '一': 'Yi', '二': 'Er', '三': 'San', '四': 'Si', '五': 'Wu',
  '六': 'Liu', '七': 'Qi', '八': 'Ba', '九': 'Jiu', '十': 'Shi', 
  '十一': 'Shi-yi', '十二': 'Shi-er', '二十': 'Er-shi', '三十': 'San-shi', 
  '四十': 'Si-shi', '五十': 'Wu-shi', '百': 'Bai', '千': 'Qian', '第一': 'Di-yi',
  
  // --- People & Family ---
  '爸爸': 'Ba-ba', '媽媽': 'Ma-ma', '哥哥': 'Ge-ge', '姊姊': 'Jie-jie', '弟弟': 'Di-di',
  '妹妹': 'Mei-mei', '家族': 'Jia-zu', '學生': 'Xue-sheng', '老師': 'Lao-shi',
  '護士': 'Hu-shi', '嬰兒': 'Ying-er', '我們(受格)': 'Wo-men', '我(受格)': 'Wo',
  '雙親之一': 'Shuang-qin',
  
  // --- School & Office ---
  '學校': 'Xue-xiao', '書': 'Shu', '鉛筆': 'Qian-bi', '鉛筆盒': 'Qian-bi-he',
  '筆記本': 'Bi-ji-ben', '橡皮擦': 'Xiang-pi-ca', '蠟筆': 'La-bi', '考試': 'Kao-shi',
  '課業': 'Ke-ye', '課': 'Ke', '班級': 'Ban-ji', '紙': 'Zhi', '英文': 'Ying-wen',
  '黑板': 'Hei-ban', '辦公室': 'Ban-gong-shi', '銀行': 'Yin-hang', '郵局': 'You-ju',
  '超市': 'Chao-shi',
  
  // --- Food & Drink ---
  '蘋果': 'Ping-guo', '香蕉': 'Xiang-jiao', '米飯': 'Mi-fan', '麵包': 'Mian-bao',
  '麵': 'Mian', '牛奶': 'Niu-nai', '果汁': 'Guo-zhi', '水': 'Shui', '魚': 'Yu',
  '雞肉': 'Ji-rou', '蛋': 'Dan', '蛋糕': 'Dan-gao', '豆子': 'Dou-zi',
  '三明治': 'San-ming-zhi', '冰淇淋': 'Bing-qi-lin', '紅蘿蔔': 'Hong-luo-bo',
  '番茄': 'Fan-qie', '馬鈴薯': 'Ma-ling-shu', '餐點': 'Can-dian', '餐廳': 'Can-ting',
  
  // --- Animals ---
  '貓': 'Mao', '狗': 'Gou', '大象': 'Da-xiang', '老虎': 'Lao-hu', '長頸鹿': 'Chang-jing-lu',
  '驢子': 'Lv-zi', '大猩猩': 'Da-xing-xing', '蝴蝶': 'Hu-die', '螞蟻': 'Ma-yi',
  '蜘蛛': 'Zhi-zhu', '青蛙': 'Qing-wa', '鯨魚': 'Jing-yu', '鵝': 'E', '鳥': 'Niao',
  
  // --- Body & Health ---
  '眼睛': 'Yan-jing', '鼻子': 'Bi-zi', '耳朵': 'Er-duo', '嘴巴': 'Zui-ba',
  '身體': 'Shen-ti', '頭': 'Tou', '脖子': 'Bo-zi', '肩': 'Jian', '肩膀': 'Jian-bang',
  '胃': 'Wei', '腰帶': 'Yao-dai', '膝蓋': 'Xi-gai', '腳': 'Jiao', '腳趾': 'Jiao-zhi',
  
  // --- Clothes ---
  '衣服': 'Yi-fu', '襪子': 'Wa-zi', '裙子': 'Qun-zi', '襯衫': 'Chen-shan',
  '帽子': 'Mao-zi', '帽子(有邊)': 'Mao-zi', '靴子': 'Xue-zi',
  '內衣': 'Nei-yi',
  
  // --- Weather & Nature ---
  '夏天': 'Xia-tian', '冬天': 'Dong-tian', '春天': 'Chun-tian', '秋天': 'Qiu-tian',
  '雪': 'Xue', '雲': 'Yun', '草': 'Cao', '風大的': 'Feng-da',
  
  // --- Travel & Directions ---
  '火車': 'Huo-che', '公車': 'Gong-che', '飛機': 'Fei-ji', '船': 'Chuan',
  '計程車': 'Ji-cheng-che', '大站/車站': 'Che-zhan', '那裡': 'Na-li',
  '在...上面': 'Zai...-shang-mian', '在...之後': 'Zai...-zhi-hou',
  '在...之間': 'Zai...-zhi-jian', '在...附近': 'Zai...-fu-jin',
  '在...對面/橫越': 'Zai...-dui-mian', '到/向': 'Dao', '國家/鄉村': 'Guo-jia',
  
  // --- Actions ---
  '跳': 'Tiao', '跑': 'Pao', '走': 'Zou', '看': 'Kan', '聽': 'Ting', '聞': 'Wen',
  '觸摩': 'Chu-mo', '觸摸': 'Chu-mo', '醒來': 'Xing-lai', '得到/到達': 'De-dao',
  '拿取/搭乘': 'Na-qu', '打掃/乾淨的': 'Da-sao', '走路': 'Zou-lu', '跑步': 'Pao-bu',
  '踢': 'Ti', '輸': 'Shu', '賣': 'Mai', '等待': 'Deng-dai', '駕駛': 'Jia-shi',
  '繪畫/刷漆': 'Hui-hua', '說話/講語言': 'Shuo-hua', '閱讀': 'Yue-du', '關上': 'Guan-shang',
  '聽到': 'Ting-dao', '得到的': 'De-dao', '掉落/跌倒': 'Diao-luo', '彈奏/玩/劇本': 'Tan-zou',
  '玩': 'Wan', '比賽/遊戲': 'Bi-sai',
  
  // --- Attributes ---
  '快樂': 'Kuai-le', '難過': 'Nan-guo', '大': 'Da', '小': 'Xiao', '大大的': 'Da-da',
  '高的': 'Gao-gao', '輕的/明亮的': 'Qing-de', '重': 'Zhong', '胖的': 'Pang-de',
  '累的': 'Lei-de', '興奮的': 'Xing-fen', '美麗的': 'Mei-li', '虛弱的': 'Xu-ruo',
  '醜的': 'Chou-de', '貧窮的/可憐的': 'Pin-qiong', '髒的': 'Zang-de', '驚訝的': 'Jing-ya',
  '錯誤的': 'Cuo-wu', '正確的': 'Zheng-que', '太/也': 'Tai', '多的': 'Duo',
  '短的/矮的': 'Duan-de', '便宜的': 'Pian-yi', '英俊的': 'Ying-jun', '害怕的': 'Hai-pa',
  '餓的': 'E-de', '渴的': 'Ke-de', '滿的/飽的': 'Man-de', '空': 'Kong'
};

export const getPinyin = (text: string): string => {
  return pinyinMap[text] || text;
};
