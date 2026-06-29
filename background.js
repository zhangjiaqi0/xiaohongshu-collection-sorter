console.log('[小红书收藏分类] Background script loaded');

// 存储默认分类
const DEFAULT_CATEGORIES = [
  { name: "美食", keywords: ["美食", "食谱", "吃饭", "餐厅", "做菜", "探店", "外卖", "烹饪", "菜谱", "早餐", "午餐", "晚餐", "甜品", "烘焙", "下午茶", "火锅", "烧烤"] },
  { name: "旅行", keywords: ["旅行", "旅游", "景点", "攻略", "打卡", "度假", "酒店", "机票", "高铁", "自驾", "露营", "周边游", "目的地", "路线", "游记"] },
  { name: "穿搭", keywords: ["穿搭", "衣服", "鞋子", "裤子", "上衣", "搭配", "时尚", "OOTD", "穿搭分享", "显瘦", "显高", "风格", "春季穿搭", "夏季穿搭", "秋季穿搭", "冬季穿搭"] },
  { name: "学习", keywords: ["学习", "考研", "读书", "笔记", "考试", "课程", "英语", "备考", "刷题", "复习", "知识", "干货", "教程", "技能", "证书"] },
  { name: "美妆", keywords: ["美妆", "护肤", "化妆品", "口红", "粉底", "化妆", "卸妆", "爽肤水", "乳液", "面霜", "精华", "面膜", "眼影", "腮红", "香水"] },
  { name: "家居", keywords: ["家居", "装修", "收纳", "家具", "布置", "软装", "改造", "租房", "搬家", "厨房", "卧室", "客厅", "阳台", "卫生间"] },
  { name: "健身", keywords: ["健身", "运动", "减肥", "减脂", "增肌", "瑜伽", "跑步", "跳绳", "普拉提", "有氧", "无氧", "锻炼", "健康", "身材管理"] },
  { name: "数码", keywords: ["数码", "手机", "电脑", "平板", "耳机", "相机", "笔记本", "测评", "推荐", "性价比", "选购", "体验", "开箱", "科技"] },
  { name: "影视", keywords: ["影视", "电影", "电视剧", "剧集", "影评", "推荐", "追剧", "综艺", "演员", "剧情", "观后感", "经典", "高分", "新片"] },
  { name: "职场", keywords: ["职场", "工作", "面试", "简历", "晋升", "薪资", "沟通", "会议", "效率", "技巧", "经验", "心得", "入职", "离职"] },
  { name: "生活", keywords: ["生活", "日常", "好物", "分享", "推荐", "实用", "种草", "拔草", "测评", "体验", "记录", "vlog", "日记"] },
  { name: "理财", keywords: ["理财", "投资", "股票", "基金", "存款", "赚钱", "副业", "收入", "支出", "预算", "省钱", "理财知识", "金融"] },
  { name: "宠物", keywords: ["宠物", "猫", "狗", "猫咪", "狗狗", "养宠", "宠物用品", "铲屎官", "萌宠", "宠物日常", "宠物健康"] },
  { name: "母婴", keywords: ["母婴", "宝宝", "育儿", "怀孕", "孕期", "新生儿", "婴儿", "辅食", "早教", "奶粉", "纸尿裤", "玩具"] },
  { name: "汽车", keywords: ["汽车", "买车", "用车", "试驾", "保养", "油耗", "车型", "评测", "新车", "二手车", "SUV", "轿车", "新能源车"] }
];

// 扩展安装时初始化
chrome.runtime.onInstalled.addListener(() => {
  console.log('[小红书收藏分类] Extension installed');
  chrome.storage.local.get('categories', (result) => {
    if (!result.categories || result.categories.length === 0) {
      chrome.storage.local.set({ categories: DEFAULT_CATEGORIES }, () => {
        console.log('[小红书收藏分类] Default categories initialized');
      });
    }
  });
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getCategories') {
    chrome.storage.local.get('categories', (result) => {
      if (result.categories && result.categories.length > 0) {
        sendResponse({ categories: result.categories });
      } else {
        sendResponse({ categories: DEFAULT_CATEGORIES });
      }
    });
    return true;
  }
});