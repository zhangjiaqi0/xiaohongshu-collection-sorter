console.log('[小红书收藏分类] content.js loaded');

let isProcessing = false;
let cachedCategories = null;
let currentNoteId = null;

const DEFAULT_CATEGORIES = [
  { 
    name: "美食", 
    keywords: [
      "美食", "食谱", "餐厅", "做菜", "探店", "外卖", "烹饪", "菜谱", 
      "早餐", "午餐", "晚餐", "甜品", "烘焙", "下午茶", "火锅", "烧烤", 
      "奶茶", "咖啡", "小吃", "夜宵", "食材", "美食分享", "美食推荐", 
      "美食教程", "家常菜", "西餐", "日料", "甜点", "饮品", "蛋糕",
      "红烧肉", "糖醋排骨", "宫保鸡丁", "麻婆豆腐", "鱼香肉丝", "水煮鱼",
      "寿司", "披萨", "汉堡", "沙拉", "意面", "拉面", "麻辣烫", "串串",
      "烤肉", "炸鸡", "披萨", "蛋糕卷", "提拉米苏", "慕斯", "曲奇",
      "戚风蛋糕", "马卡龙", "泡芙", "面包", "吐司", "三明治",
      "果蔬汁", "果汁", "酸奶", "冰淇淋", "雪糕", "棒冰",
      "美食博主", "美食摄影", "美食日记", "美食攻略", "吃货日常",
      "下厨", "厨艺", "烹饪技巧", "刀工", "调味", "腌制", "蒸煮", "油炸",
      "网红餐厅", "宝藏餐厅", "平价美食", "高端餐厅", "私房菜",
      "地方美食", "特色美食", "传统美食", "创意料理", "fusion料理"
    ],
    excludeWords: ["宠物食品", "宠物零食", "狗粮", "猫粮"],
    priority: 3
  },
  { 
    name: "旅行", 
    keywords: [
      "旅行", "旅游", "景点", "攻略", "度假", "酒店", "机票", "高铁", 
      "自驾", "露营", "周边游", "目的地", "路线", "游记", "民宿", 
      "风景", "旅行日记", "旅行攻略", "旅游攻略", "出行", "游玩",
      "打卡景点", "必去景点", "网红打卡", "旅游日记", "旅行分享",
      "自由行", "跟团游", "定制游", "深度游", "穷游", "特种兵旅游",
      "海边", "沙滩", "海岛", "潜水", "冲浪", "游泳", "游艇",
      "登山", "爬山", "徒步", "爬山攻略", "山景", "日出日落",
      "古镇", "古街", "历史遗迹", "文化景点", "博物馆", "展览",
      "主题乐园", "游乐园", "动物园", "植物园", "水上乐园",
      "温泉", "温泉酒店", "度假村", "SPA", "养生度假",
      "亲子游", "蜜月旅行", "毕业旅行", "商务出差", "背包客",
      "旅行装备", "旅行包", "行李箱", "护照", "签证", "出境游",
      "国内游", "港澳游", "台湾游", "东南亚游", "欧洲游", "美洲游",
      "穷游攻略", "省钱攻略", "旅行预算", "旅行保险"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "穿搭", 
    keywords: [
      "穿搭", "衣服", "鞋子", "裤子", "上衣", "搭配", "时尚", "OOTD", 
      "穿搭分享", "显瘦", "显高", "风格", "春季穿搭", "夏季穿搭", 
      "秋季穿搭", "冬季穿搭", "连衣裙", "卫衣", "T恤", "外套", 
      "牛仔裤", "穿搭技巧", "每日穿搭",
      "西装", "衬衫", "polo衫", "毛衣", "针织衫", "毛衣开衫",
      "风衣", "大衣", "羽绒服", "棉服", "皮衣", "夹克",
      "短裙", "半身裙", "长裙", "百褶裙", "A字裙", "蓬蓬裙",
      "短裤", "休闲裤", "阔腿裤", "哈伦裤", "工装裤", "运动裤",
      "高跟鞋", "平底鞋", "运动鞋", "帆布鞋", "凉鞋", "拖鞋",
      "靴子", "短靴", "长靴", "马丁靴", "切尔西靴", "雪地靴",
      "包包", "手提包", "单肩包", "双肩包", "斜挎包", "钱包",
      "配饰", "帽子", "围巾", "手套", "耳环", "项链", "手链",
      "手表", "墨镜", "腰带", "发饰", "头饰", "发带",
      "职场穿搭", "学生穿搭", "约会穿搭", "度假穿搭", "运动穿搭",
      "日常穿搭", "通勤穿搭", "休闲穿搭", "正式穿搭", "派对穿搭",
      "色彩搭配", "款式搭配", "材质搭配", "风格搭配", "身材搭配",
      "潮流穿搭", "经典穿搭", "简约穿搭", "复古穿搭", "街头穿搭",
      "文艺穿搭", "甜美穿搭", "酷帅穿搭", "温柔穿搭", "知性穿搭",
      "显瘦穿搭", "显高穿搭", "遮肉穿搭", "身材修饰", "穿搭雷区"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "学习", 
    keywords: [
      "学习", "考研", "读书", "笔记", "考试", "课程", "英语", "备考", 
      "刷题", "复习", "知识", "干货", "教程", "技能", "证书", 
      "学习方法", "学习打卡", "学习笔记", "书单", "阅读", "写作", "编程",
      "四级", "六级", "雅思", "托福", "GRE", "GMAT", "SAT", "ACT",
      "高考", "中考", "期末考", "期中考", "模拟考", "真题", "答案",
      "数学", "语文", "物理", "化学", "生物", "历史", "地理", "政治",
      "专业课", "公共课", "选修课", "必修课", "网课", "直播课", "录播课",
      "学习计划", "时间管理", "效率提升", "专注力", "记忆力", "思维导图",
      "笔记方法", "康奈尔笔记", "bullet journal", "手账", "日记",
      "读书笔记", "书评", "读书心得", "阅读笔记", "书摘", "读书分享",
      "知识分享", "干货分享", "经验分享", "技巧分享", "学习方法分享",
      "Python", "Java", "JavaScript", "C++", "C语言", "编程入门",
      "算法", "数据结构", "前端开发", "后端开发", "移动开发", "全栈",
      "设计软件", "PS教程", "AI教程", "PR教程", "CAD教程", "3D建模",
      "职场技能", "沟通技巧", "演讲技巧", "写作技巧", "时间管理技巧",
      "考证", "职业资格", "驾照", "会计证", "教师资格证", "普通话证",
      "学习资料", "教材", "讲义", "课件", "习题集", "错题本", "笔记本"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "美妆", 
    keywords: [
      "美妆", "护肤", "化妆品", "口红", "粉底", "化妆", "卸妆", 
      "爽肤水", "乳液", "面霜", "精华", "面膜", "眼影", "腮红", 
      "香水", "化妆教程", "护肤分享", "底妆", "彩妆", "眉笔", 
      "眼妆", "仿妆", "妆容", "化妆技巧",
      "眼线", "睫毛膏", "眼线笔", "眼线液", "睫毛夹", "假睫毛",
      "遮瑕", "遮瑕膏", "遮瑕笔", "定妆", "定妆粉", "定妆喷雾",
      "高光", "修容", "阴影", "鼻影", "打亮", "立体妆容",
      "唇釉", "唇膏", "唇蜜", "唇彩", "唇线笔", "染唇液",
      "美瞳", "隐形眼镜", "眼镜妆", "眼妆教程", "眼妆技巧",
      "日常妆容", "职场妆容", "约会妆容", "派对妆容", "新娘妆",
      "韩妆", "日妆", "欧美妆", "泰妆", "港风妆", "复古妆",
      "素颜妆", "伪素颜", "裸妆", "淡妆", "浓妆", "妆感",
      "妆前乳", "隔离霜", "防晒霜", "妆前打底", "底妆步骤",
      "护肤步骤", "护肤顺序", "护肤教程", "护肤心得", "护肤经验",
      "美白", "保湿", "抗皱", "抗衰老", "祛斑", "祛痘", "去黑头",
      "清洁面膜", "补水面膜", "美白面膜", "祛痘面膜", "泥膜",
      "护肤产品", "护肤品推荐", "护肤好物", "护肤心得", "护肤分享",
      "化妆产品", "化妆品推荐", "化妆好物", "彩妆推荐", "彩妆测评",
      "妆容教程", "化妆教程", "仿妆教程", "妆容分享", "妆容打卡",
      "妆容技巧", "化妆技巧", "底妆技巧", "眼妆技巧", "唇妆技巧"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "家居", 
    keywords: [
      "家居", "装修", "收纳", "家具", "布置", "软装", "改造", 
      "租房", "搬家", "厨房", "卧室", "客厅", "阳台", "卫生间", 
      "家居好物", "收纳整理", "家居装饰", "家居设计", "家居布置",
      "家居风格", "简约风格", "北欧风格", "日式风格", "中式风格",
      "现代风格", "复古风格", "工业风格", "ins风格", "田园风格",
      "沙发", "茶几", "电视柜", "餐桌", "餐椅", "书桌", "书架",
      "床", "床垫", "床头柜", "衣柜", "梳妆台", "鞋柜", "储物柜",
      "窗帘", "地毯", "挂画", "摆件", "装饰品", "花瓶", "绿植",
      "收纳盒", "收纳袋", "收纳篮", "收纳架", "收纳柜", "收纳神器",
      "厨房收纳", "衣柜收纳", "书桌收纳", "浴室收纳", "玄关收纳",
      "整理技巧", "收纳技巧", "收纳方法", "收纳心得", "收纳分享",
      "装修攻略", "装修日记", "装修心得", "装修经验", "装修避坑",
      "装修风格", "装修设计", "装修预算", "装修材料", "装修步骤",
      "软装搭配", "软装设计", "软装布置", "软装推荐", "软装好物",
      "改造日记", "房间改造", "厨房改造", "卧室改造", "客厅改造",
      "租房改造", "小户型改造", "老房改造", "二手房改造",
      "家居好物推荐", "家居好物分享", "家居好物测评", "家居神器",
      "家居清洁", "家居保养", "家居维护", "家居收纳整理"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "健身", 
    keywords: [
      "健身", "运动", "减肥", "减脂", "增肌", "瑜伽", "跑步", 
      "跳绳", "普拉提", "有氧", "无氧", "锻炼", "健康", 
      "身材管理", "健身打卡", "运动穿搭", "健身计划", 
      "健身教程", "有氧运动",
      "力量训练", "负重训练", "器械训练", "徒手训练", "体能训练",
      "核心训练", "腹部训练", "腿部训练", "背部训练", "胸部训练",
      "手臂训练", "肩部训练", "臀部训练", "全身训练",
      "跑步机", "哑铃", "杠铃", "壶铃", "弹力带", "瑜伽垫",
      "瑜伽球", "跳绳", "动感单车", "划船机", "椭圆机",
      "跑步技巧", "跑步姿势", "跑步装备", "跑步路线", "马拉松",
      "瑜伽入门", "瑜伽体式", "瑜伽呼吸", "瑜伽冥想", "流瑜伽",
      "普拉提入门", "普拉提动作", "普拉提核心", "普拉提塑形",
      "减肥餐", "减脂餐", "健身餐", "营养搭配", "饮食控制",
      "增肌餐", "蛋白质", "碳水化合物", "脂肪", "卡路里",
      "健身APP", "健身视频", "健身教程", "健身课程", "健身教练",
      "健身房", "健身馆", "运动馆", "游泳馆", "羽毛球馆",
      "运动装备", "运动服装", "运动鞋", "运动包", "运动护具",
      "骑行", "游泳", "羽毛球", "篮球", "足球", "乒乓球", "网球",
      "滑板", "滑雪", "攀岩", "冲浪", "潜水", "跳伞", "蹦极"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "数码", 
    keywords: [
      "数码", "手机", "电脑", "平板", "耳机", "相机", "笔记本", 
      "测评", "推荐", "性价比", "选购", "体验", "开箱", 
      "科技", "数码产品", "手机测评", "电脑配置", 
      "数码配件", "智能设备",
      "iPhone", "Android", "华为", "小米", "OPPO", "vivo", "荣耀",
      "三星", "索尼", "LG", "诺基亚", "摩托罗拉", "黑莓",
      "MacBook", "ThinkPad", "戴尔", "惠普", "华硕", "宏碁", "联想",
      "iPad", "Surface", "安卓平板", "华为平板", "小米平板",
      "AirPods", "索尼耳机", "BOSE", "JBL", "漫步者", "铁三角",
      "降噪耳机", "头戴式耳机", "入耳式耳机", "蓝牙耳机", "有线耳机",
      "单反相机", "微单相机", "数码相机", "拍立得", "运动相机", "无人机",
      "佳能", "尼康", "索尼相机", "富士", "徕卡", "哈苏",
      "机械键盘", "游戏鼠标", "显示器", "显卡", "CPU", "内存", "硬盘",
      "SSD", "U盘", "移动硬盘", "充电宝", "数据线", "充电器",
      "智能手表", "智能手环", "智能音箱", "智能家居", "智能门锁",
      "VR眼镜", "AR眼镜", "游戏机", "PS5", "Xbox", "Switch",
      "数码测评", "数码评测", "数码对比", "数码推荐", "数码选购",
      "开箱测评", "上手体验", "深度评测", "对比评测", "评测视频",
      "科技资讯", "数码资讯", "新品发布", "数码新品", "科技新品"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "影视", 
    keywords: [
      "影视", "电影", "电视剧", "剧集", "影评", "推荐", "追剧", 
      "综艺", "演员", "剧情", "观后感", "经典", "高分", "新片", 
      "电影推荐", "剧荒", "观影记录", "电影分享", "电视剧推荐",
      "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "悬疑片",
      "剧情片", "动画片", "纪录片", "音乐片", "歌舞片", "战争片",
      "历史片", "传记片", "奇幻片", "冒险片", "灾难片", "西部片",
      "国产剧", "美剧", "韩剧", "日剧", "泰剧", "英剧", "港剧",
      "综艺节目", "真人秀", "脱口秀", "访谈节目", "选秀节目", "竞技节目",
      "快乐大本营", "奔跑吧", "极限挑战", "王牌对王牌", "歌手",
      "乘风破浪", "披荆斩棘", "中国好声音", "蒙面唱将", "我是歌手",
      "奥斯卡", "金球奖", "戛纳电影节", "柏林电影节", "威尼斯电影节",
      "金马奖", "金像奖", "百花奖", "华表奖", "飞天奖", "金鹰奖",
      "迪士尼", "漫威", "DC", "皮克斯", "环球影业", "华纳兄弟",
      "Netflix", "Disney+", "HBO", "Amazon Prime", "爱奇艺", "腾讯视频",
      "优酷", "芒果TV", "B站", "西瓜视频", "抖音影视", "快手影视",
      "影评分享", "电影评论", "剧评", "影视评论", "观剧心得",
      "电影打卡", "观影日记", "追剧日记", "看剧心得", "观影推荐",
      "经典电影", "必看电影", "神剧", "口碑剧", "爆款剧", "热门剧"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "职场", 
    keywords: [
      "职场", "工作", "面试", "简历", "晋升", "薪资", "沟通", 
      "会议", "效率", "技巧", "经验", "心得", "入职", "离职", 
      "职场干货", "职场技巧", "办公软件", "PPT", 
      "职场沟通", "职场经验",
      "求职", "应聘", "招聘", "猎头", "HR", "面试官", "面试技巧",
      "简历模板", "简历技巧", "简历优化", "简历撰写", "求职简历",
      "薪资谈判", "薪资待遇", "薪资结构", "年终奖", "绩效奖金",
      "晋升机会", "晋升技巧", "晋升路径", "职业发展", "职业规划",
      "职场人际关系", "同事关系", "上级关系", "团队协作", "跨部门沟通",
      "会议技巧", "会议记录", "会议纪要", "PPT制作", "Excel技巧",
      "Word技巧", "Office技巧", "办公软件技巧", "办公效率",
      "职场礼仪", "职场规范", "职场文化", "职场规则", "职场潜规则",
      "工作心得", "工作经验", "工作技巧", "工作方法", "工作态度",
      "职场焦虑", "职场压力", "工作压力", "心理健康", "职场心理",
      "跳槽", "转行", "职业转型", "职业选择", "职业困惑",
      "职场新人", "应届生", "实习生", "职场小白", "职场进阶",
      "领导力", "管理能力", "团队管理", "项目管理", "时间管理",
      "职场女性", "职场妈妈", "职场平衡", "工作生活平衡", "职场权益",
      "劳动合同", "五险一金", "社保", "公积金", "劳动法", "职场维权"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "生活", 
    keywords: [
      "生活", "日常", "好物", "分享", "推荐", "实用", "种草", 
      "拔草", "测评", "体验", "记录", "vlog", "日记", 
      "生活碎片", "日常分享", "生活好物", "生活技巧", "居家生活",
      "生活小妙招", "生活小技巧", "生活窍门", "生活智慧", "生活经验",
      "日常好物推荐", "日常好物分享", "生活好物推荐", "实用好物",
      "好物测评", "好物分享", "好物推荐", "好物打卡", "好物清单",
      "种草好物", "种草分享", "种草推荐", "拔草好物", "拔草分享",
      "生活记录", "日常记录", "生活日记", "日常日记", "生活vlog",
      "日常vlog", "生活分享", "日常分享", "生活打卡", "日常打卡",
      "居家日常", "宅家日常", "居家分享", "宅家分享", "居家好物",
      "生活方式", "生活态度", "生活理念", "生活品质", "生活质量",
      "极简生活", "精致生活", "慢生活", "简约生活", "理性生活",
      "省钱技巧", "省钱攻略", "省钱好物", "省钱分享", "省钱经验",
      "生活计划", "生活目标", "生活清单", "生活愿望", "生活安排",
      "周末生活", "假期生活", "休息日", "放松", "休闲", "娱乐"
    ],
    excludeWords: [],
    priority: 1
  },
  { 
    name: "理财", 
    keywords: [
      "理财", "投资", "股票", "基金", "存款", "赚钱", "副业", 
      "收入", "支出", "预算", "省钱", "理财知识", "金融", 
      "炒股", "理财规划", "基金定投", "存款打卡", "理财技巧",
      "A股", "港股", "美股", "蓝筹股", "白马股", "成长股", "价值股",
      "ETF", "LOF", "货币基金", "债券基金", "股票基金", "混合基金",
      "指数基金", "主动基金", "公募基金", "私募基金", "基金经理",
      "股票分析", "技术分析", "基本面分析", "财报分析", "估值方法",
      "炒股技巧", "炒股经验", "炒股心得", "炒股入门", "炒股教程",
      "理财入门", "理财基础", "理财进阶", "理财心得", "理财经验",
      "家庭理财", "个人理财", "理财配置", "资产配置", "投资组合",
      "定期存款", "活期存款", "大额存单", "银行理财", "理财产品",
      "保险", "寿险", "健康险", "意外险", "车险", "保险配置",
      "副业赚钱", "兼职赚钱", "自由职业", "网络赚钱", "创业",
      "收入来源", "被动收入", "主动收入", "收入结构", "收入增长",
      "支出管理", "支出控制", "支出分析", "记账", "记账软件", "记账习惯",
      "预算管理", "预算计划", "预算控制", "预算分配", "预算执行",
      "省钱方法", "省钱技巧", "省钱攻略", "省钱经验", "省钱习惯",
      "财务自由", "提前退休", "FIRE运动", "财富积累", "财富增长"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "宠物", 
    keywords: [
      "宠物", "猫", "狗", "猫咪", "狗狗", "养宠", "宠物用品", 
      "铲屎官", "萌宠", "宠物日常", "宠物健康", "猫粮", "狗粮", 
      "宠物零食", "猫咪日常", "狗狗日常", "宠物猫", "宠物狗",
      "英短", "美短", "布偶猫", "波斯猫", "暹罗猫", "加菲猫", "橘猫",
      "黑猫", "白猫", "三花猫", "狸花猫", "蓝猫", "银渐层", "金渐层",
      "金毛", "拉布拉多", "哈士奇", "萨摩耶", "泰迪", "柯基", "比熊",
      "博美", "柴犬", "秋田犬", "德牧", "边牧", "雪纳瑞", "贵宾犬",
      "流浪猫", "流浪狗", "救助猫", "救助狗", "领养宠物", "宠物领养",
      "猫咪救助", "狗狗救助", "动物救助", "宠物保护", "动物保护",
      "猫罐头", "狗罐头", "猫玩具", "狗玩具", "猫窝", "狗窝", "猫爬架",
      "宠物美容", "猫咪美容", "狗狗美容", "宠物洗澡", "宠物剪毛",
      "宠物医院", "兽医", "宠物医疗", "宠物疫苗", "宠物驱虫",
      "猫咪性格", "狗狗性格", "宠物性格", "猫咪行为", "狗狗行为",
      "养猫心得", "养狗心得", "养宠心得", "养猫经验", "养狗经验",
      "猫咪可爱", "狗狗可爱", "萌宠日常", "宠物搞笑", "宠物趣事",
      "猫咪睡觉", "狗狗睡觉", "猫咪吃饭", "狗狗吃饭", "猫咪玩耍",
      "狗狗玩耍", "猫咪打闹", "狗狗打闹", "猫咪撒娇", "狗狗撒娇"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "母婴", 
    keywords: [
      "母婴", "宝宝", "育儿", "怀孕", "孕期", "新生儿", "婴儿", 
      "辅食", "早教", "奶粉", "纸尿裤", "玩具", "育儿知识", 
      "宝宝穿搭", "待产包", "育儿经验", "宝宝用品",
      "备孕", "备孕攻略", "备孕知识", "备孕经验", "备孕好物",
      "孕早期", "孕中期", "孕晚期", "孕期饮食", "孕期运动", "孕期检查",
      "孕吐", "孕期反应", "孕期护理", "孕期营养", "孕期注意事项",
      "产检", "B超", "胎心", "胎动", "唐筛", "糖耐", "无创", "羊穿",
      "顺产", "剖腹产", "生产经历", "分娩经历", "待产经验", "生产日记",
      "母乳喂养", "奶粉喂养", "混合喂养", "喂养技巧", "喂养经验",
      "辅食添加", "辅食制作", "辅食教程", "辅食食谱", "宝宝辅食",
      "婴儿辅食", "第一口辅食", "辅食顺序", "辅食时间", "辅食量",
      "早教课程", "早教方法", "早教知识", "早教经验", "早教好物",
      "启蒙教育", "亲子互动", "亲子游戏", "亲子阅读", "绘本推荐",
      "婴儿玩具", "幼儿玩具", "益智玩具", "电动玩具", "积木", "拼图",
      "婴儿服装", "幼儿服装", "宝宝衣服", "婴儿穿搭", "幼儿穿搭",
      "婴儿用品", "幼儿用品", "宝宝用品", "婴儿必备", "幼儿必备",
      "奶瓶", "奶嘴", "婴儿车", "婴儿床", "摇篮", "安全座椅",
      "纸尿裤推荐", "奶粉推荐", "婴儿用品推荐", "母婴好物推荐",
      "育儿日记", "育儿心得", "育儿经验", "育儿技巧", "育儿方法",
      "宝宝成长", "宝宝发育", "宝宝健康", "宝宝护理", "宝宝照顾"
    ],
    excludeWords: [],
    priority: 3
  },
  { 
    name: "汽车", 
    keywords: [
      "汽车", "买车", "用车", "试驾", "保养", "油耗", "车型", 
      "评测", "新车", "二手车", "SUV", "轿车", "新能源车", 
      "汽车测评", "购车指南", "汽车保养", "驾驶",
      "汽车品牌", "奔驰", "宝马", "奥迪", "大众", "丰田", "本田",
      "日产", "马自达", "福特", "别克", "雪佛兰", "现代", "起亚",
      "比亚迪", "吉利", "长城", "长安", "奇瑞", "红旗", "蔚来",
      "特斯拉", "小鹏", "理想", "威马", "哪吒", "零跑", "极氪",
      "跑车", "豪华车", "进口车", "国产车", "合资车", "自主品牌",
      "轿车评测", "SUV评测", "MPV评测", "新能源评测", "电动车评测",
      "试驾体验", "试驾报告", "试驾心得", "试驾视频", "试驾日记",
      "购车攻略", "买车技巧", "购车经验", "选车指南", "买车指南",
      "二手车选购", "二手车检测", "二手车交易", "二手车评估", "二手车价格",
      "汽车保养技巧", "汽车保养知识", "汽车保养经验", "保养周期",
      "机油更换", "轮胎更换", "刹车保养", "空调保养", "发动机保养",
      "驾驶技巧", "驾驶经验", "驾驶方法", "驾驶安全", "新手驾驶",
      "停车技巧", "倒车技巧", "坡道起步", "高速驾驶", "城市驾驶",
      "汽车保险", "车险选购", "保险理赔", "交通事故", "道路救援",
      "汽车改装", "车辆改装", "外观改装", "性能改装", "内饰改装",
      "汽车用品", "车载用品", "车载配件", "行车记录仪", "导航仪",
      "车载音响", "车载空调", "车载充电器", "车载冰箱", "车载空气净化"
    ],
    excludeWords: [],
    priority: 3
  }
];

function initCategories() {
  try {
    chrome.storage.local.get('categories', (result) => {
      if (result.categories && Array.isArray(result.categories) && result.categories.length > 0) {
        cachedCategories = result.categories;
        console.log('[小红书收藏分类] Categories loaded:', cachedCategories.length);
      } else {
        cachedCategories = DEFAULT_CATEGORIES;
        console.log('[小红书收藏分类] Using default categories');
      }
    });
  } catch (e) {
    console.log('[小红书收藏分类] Failed to load categories, using defaults:', e);
    cachedCategories = DEFAULT_CATEGORIES;
  }
}

function getCategories() {
  return new Promise((resolve) => {
    if (cachedCategories) {
      resolve(cachedCategories);
      return;
    }
    
    try {
      chrome.storage.local.get('categories', (result) => {
        if (result.categories && Array.isArray(result.categories) && result.categories.length > 0) {
          cachedCategories = result.categories;
          resolve(cachedCategories);
        } else {
          cachedCategories = DEFAULT_CATEGORIES;
          resolve(cachedCategories);
        }
      });
    } catch (e) {
      cachedCategories = DEFAULT_CATEGORIES;
      resolve(cachedCategories);
    }
  });
}

function extractNoteContent() {
  let title = '';
  let desc = '';
  let tags = '';
  
  const titleEl = document.querySelector('h1, [class*="title"], [class*="Title"], .note-title');
  if (titleEl) title = titleEl.textContent.trim();
  
  const descEl = document.querySelector('p, [class*="desc"], [class*="Desc"], [class*="content"], [class*="Content"], .note-content');
  if (descEl) desc = descEl.textContent.trim();
  
  const tagEls = document.querySelectorAll('span[class*="tag"], a[class*="tag"], [class*="topic"], [class*="Topic"], .topic-tag');
  tags = Array.from(tagEls)
    .map(tag => tag.textContent.trim())
    .filter(tag => tag && !['作者', '收藏', '分享', '评论', '点赞'].includes(tag))
    .join(' ');

  const metaEls = document.querySelectorAll('[class*="meta"], [class*="Meta"]');
  const meta = Array.from(metaEls)
    .map(m => m.textContent.trim())
    .filter(m => m && !m.includes('作者'))
    .join(' ');

  return {
    title,
    desc,
    tags,
    full: (title + ' ' + desc + ' ' + tags + ' ' + meta).trim()
  };
}

function matchCategory(content, categories) {
  const title = content.title.toLowerCase();
  const desc = content.desc.toLowerCase();
  const tags = content.tags.toLowerCase();
  const full = content.full.toLowerCase();
  
  let bestMatch = null;
  let bestScore = 0;
  const MIN_SCORE = 3;
  
  for (const category of categories) {
    let score = 0;
    const matchedKeywords = [];
    
    for (const keyword of category.keywords) {
      const keywordLower = keyword.toLowerCase();
      const isInTitle = title.includes(keywordLower);
      const isInTags = tags.includes(keywordLower);
      const isInDesc = desc.includes(keywordLower);
      
      if (isInTitle) {
        score += 4;
        matchedKeywords.push({ word: keyword, source: '标题' });
      } else if (isInTags) {
        score += 3;
        matchedKeywords.push({ word: keyword, source: '标签' });
      } else if (isInDesc) {
        score += 1;
        matchedKeywords.push({ word: keyword, source: '描述' });
      }
      
      if (full.includes(keywordLower)) {
        const regex = new RegExp('(^|\\s|[^\u4e00-\u9fa5])' + keywordLower + '($|\\s|[^\u4e00-\u9fa5])', 'g');
        const matches = full.match(regex);
        if (matches) {
          score += matches.length * 0.5;
        }
      }
    }
    
    if (category.excludeWords && category.excludeWords.length > 0) {
      for (const exclude of category.excludeWords) {
        if (full.includes(exclude.toLowerCase())) {
          score -= 10;
        }
      }
    }
    
    score += category.priority || 0;
    
    if (score > bestScore && score >= MIN_SCORE) {
      bestScore = score;
      bestMatch = {
        ...category,
        score,
        matchedKeywords
      };
    }
  }
  
  if (bestMatch) {
    console.log('[小红书收藏分类] 匹配结果:', bestMatch.name, '得分:', bestMatch.score.toFixed(1), '匹配关键词:', bestMatch.matchedKeywords.map(k => k.word).join(', '));
  }
  
  return bestMatch || null;
}

function getNoteId() {
  const url = window.location.href;
  const match = url.match(/\/note\/(\d+)/);
  return match ? match[1] : url;
}

function resetNoteId() {
  currentNoteId = null;
}

initCategories();

async function handleCollection() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    console.log('[小红书收藏分类] handleCollection called');
    
    const categories = await getCategories();
    console.log('[小红书收藏分类] categories:', categories.length);
    
    await delay(500);
    
    const content = extractNoteContent();
    console.log('[小红书收藏分类] 提取内容 - 标题:', content.title);
    console.log('[小红书收藏分类] 提取内容 - 标签:', content.tags);
    
    const matchedCategory = matchCategory(content, categories);
    console.log('[小红书收藏分类] 匹配分类:', matchedCategory ? matchedCategory.name : '未匹配');
    
    if (!matchedCategory) {
      isProcessing = false;
      return;
    }
    
    await delay(300);
    
    const addToAlbumBtn = await waitForAddToAlbumButton();
    if (!addToAlbumBtn) {
      console.log('[小红书收藏分类] 未找到"加入专辑"按钮');
      isProcessing = false;
      return;
    }
    
    console.log('[小红书收藏分类] 点击"加入专辑"按钮');
    simulateClick(addToAlbumBtn);
    
    await delay(500);
    
    const albumModal = await waitForAlbumModal();
    if (!albumModal) {
      console.log('[小红书收藏分类] 未找到专辑弹窗');
      isProcessing = false;
      return;
    }
    
    console.log('[小红书收藏分类] 找到专辑弹窗');
    
    const existingAlbum = await findAlbum(matchedCategory.name);
    
    if (existingAlbum) {
      console.log('[小红书收藏分类] 找到已有专辑:', matchedCategory.name);
      simulateClick(existingAlbum);
    } else {
      console.log('[小红书收藏分类] 创建新专辑:', matchedCategory.name);
      await createAlbum(matchedCategory.name);
    }
    
    await delay(300);
    
  } catch (error) {
    console.error('[小红书收藏分类] 处理失败:', error);
  } finally {
    isProcessing = false;
  }
}

async function waitForAddToAlbumButton() {
  const selectors = [
    '.right-area',
    '.message-content .right-area',
    '.msg-container .right-area'
  ];
  
  for (const selector of selectors) {
    const element = await waitForElement(selector, 3000);
    if (element && element.textContent.includes('加入专辑')) {
      return element;
    }
  }
  
  const addToAlbum = await waitForTextInElement('*', '加入专辑', 3000);
  if (addToAlbum) {
    return addToAlbum;
  }
  
  return null;
}

async function waitForAlbumModal() {
  const selectors = [
    '.tooltip-container .board-list-container',
    '.tooltip-container',
    '.board-list-container'
  ];
  
  for (const selector of selectors) {
    const element = await waitForElement(selector, 5000);
    if (element) {
      return element;
    }
  }
  
  return null;
}

async function findAlbum(albumName) {
  const boardList = document.querySelector('.board-list');
  if (!boardList) {
    console.log('[小红书收藏分类] 未找到专辑列表');
    return null;
  }
  
  const boardItems = boardList.querySelectorAll('.board-item');
  console.log('[小红书收藏分类] 找到', boardItems.length, '个专辑');
  
  for (const item of boardItems) {
    const nameText = item.querySelector('.name-text');
    if (nameText && nameText.textContent.trim() === albumName) {
      console.log('[小红书收藏分类] 匹配到专辑:', nameText.textContent);
      return item;
    }
  }
  
  return null;
}

async function createAlbum(albumName) {
  const createBtn = document.querySelector('.create-board');
  if (!createBtn) {
    console.log('[小红书收藏分类] 未找到创建专辑按钮');
    return;
  }
  
  console.log('[小红书收藏分类] 点击创建专辑按钮');
  simulateClick(createBtn);
  
  await delay(300);
  
  const input = document.querySelector('.input-content');
  if (!input) {
    console.log('[小红书收藏分类] 未找到专辑名称输入框');
    return;
  }
  
  console.log('[小红书收藏分类] 输入专辑名称:', albumName);
  
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  nativeInputValueSetter.call(input, albumName);
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  
  await delay(200);
  
  const confirmBtn = document.querySelector('.complete-btn .reds-button-new');
  if (confirmBtn) {
    console.log('[小红书收藏分类] 点击完成按钮');
    simulateClick(confirmBtn);
  } else {
    console.log('[小红书收藏分类] 未找到完成按钮');
  }
}

function simulateClick(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) {
    console.log('[小红书收藏分类] 元素不可见');
    return false;
  }
  
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2
  });
  element.dispatchEvent(event);
  return true;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
      if (Date.now() - startTime >= timeout) {
        resolve(null);
        return;
      }
      setTimeout(check, 50);
    };
    
    check();
  });
}

function waitForTextInElement(selector, text, timeout = 5000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const check = () => {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        if (element.textContent && element.textContent.includes(text)) {
          resolve(element);
          return;
        }
      }
      if (Date.now() - startTime >= timeout) {
        resolve(null);
        return;
      }
      setTimeout(check, 50);
    };
    
    check();
  });
}

function bindCollectionButton() {
  const collectBtn = document.querySelector('#note-page-collect-board-guide');
  
  if (collectBtn && !collectBtn.dataset.collectionBound) {
    collectBtn.dataset.collectionBound = 'true';
    console.log('[小红书收藏分类] Found collect button, bound click event');
    
    collectBtn.addEventListener('click', () => {
      console.log('[小红书收藏分类] Collect button clicked!');
      resetNoteId();
      setTimeout(handleCollection, 500);
    });
    
    return true;
  }
  
  return false;
}

function startPolling() {
  console.log('[小红书收藏分类] Starting polling...');
  
  const poll = () => {
    const newNoteId = getNoteId();
    if (newNoteId !== currentNoteId) {
      currentNoteId = newNoteId;
      console.log('[小红书收藏分类] Page changed, new note:', currentNoteId);
    }
    
    bindCollectionButton();
    setTimeout(poll, 1000);
  };
  
  poll();
}

startPolling();

document.addEventListener('click', (e) => {
  if (e.target.closest && e.target.closest('#note-page-collect-board-guide')) {
    console.log('[小红书收藏分类] Global click detected on collect button');
  }
});

window.addEventListener('hashchange', () => {
  console.log('[小红书收藏分类] Hash changed');
  resetNoteId();
});

window.addEventListener('popstate', () => {
  console.log('[小红书收藏分类] Popstate triggered');
  resetNoteId();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'testMatch') {
    getCategories().then(categories => {
      const content = extractNoteContent();
      const matched = matchCategory(content, categories);
      sendResponse({
        success: true,
        content: content.full,
        title: content.title,
        tags: content.tags,
        category: matched ? matched.name : null,
        score: matched ? matched.score.toFixed(1) : null,
        keywords: matched ? matched.matchedKeywords.map(k => k.word) : []
      });
    });
    return true;
  }
});