import * as SQLite from 'expo-sqlite';

export default async function GetAwardList(whereCond = 'get_flg = 1') {
  // iconSizeのデフォルトは48
  const kotteriIds = [
    1477, 1478, 1260, 840, 1261, 3268, 3153, 3152, 559, 560,
    561, 1841, 839, 843, 632, 639, 640, 1160, 1164, 1165,
    1166, 699, 703, 708, 1476,
  ];
  const kotteriSql = `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND place_seq IN (${kotteriIds.join(',')});`;

  const awardList = [
    {
      title: '弐桃兵',
      description: '聖地のフラグを 1 個獲得する。',
      targetCount: 1,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#C47222',
    },
    {
      title: '壱桃兵',
      description: '聖地のフラグを 5 個獲得する。',
      targetCount: 5,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#A0A0A0',
    },
    {
      title: '上桃兵',
      description: '聖地のフラグを 20 個獲得する。',
      targetCount: 20,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#E8DC00',
    },

    {
      title: '桃伍長',
      description: '聖地のフラグを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#444444',
    },

    {
      title: '桃軍曹',
      description: '聖地のフラグを 100 個獲得する。',
      targetCount: 100,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'Ionicons',
      iconName: 'trophy',
      iconColor: '#C47222',
    },
    {
      title: '桃曹長',
      description: '聖地のフラグを 200 個獲得する。',
      targetCount: 200,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'Ionicons',
      iconName: 'trophy',
      iconColor: '#A0A0A0',
    },
    {
      title: '桃少尉',
      description: '聖地のフラグを 300 個獲得する。',
      targetCount: 300,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'Ionicons',
      iconName: 'trophy',
      iconColor: '#E8DC00',
    },
    {
      title: '桃大尉',
      description: '聖地のフラグを 500 個獲得する。',
      targetCount: 500,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond};`,
      iconProvider: 'Ionicons',
      iconName: 'trophy',
      iconColor: '#444444',
    },

    {
      title: 'こってりパトロール見習い隊員',
      description: 'こってりパトロールで紹介されたお店のフラグを 1 個獲得する。',
      targetCount: 1,
      getCountSQL: kotteriSql,
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#C47222',
    },
    {
      title: 'こってりパトロール正隊員',
      description: 'こってりパトロールで紹介されたお店のフラグを 5 個獲得する。',
      targetCount: 5,
      getCountSQL: kotteriSql,
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#A0A0A0',
    },
    {
      title: 'こってりパトロール司令官',
      description: 'こってりパトロールで紹介されたお店のフラグを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: kotteriSql,
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#E8DC00',
    },
    {
      title: 'こってりパトロール総監',
      description: 'こってりパトロールで紹介されたお店のフラグを 20 個獲得する。',
      targetCount: 20,
      getCountSQL: kotteriSql,
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#444444',
    },

    // 海外

    // 太陽とえくぼ、茶畑のシンデレラ、ビタミンB、べっぴんさん
    {
      // ガラスの靴アイコン
      title: '茶畑のシンデレラ',
      description: 'タグ「百田夏菜子」のフラグを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "百田夏菜子";`,
      iconProvider: 'MaterialCommunityIcons',
      iconName: 'shoe-heel',
      iconColor: 'red',
      iconSize: 42,
    },
    {
      title: '太陽とえくぼ',
      description: 'タグ「百田夏菜子」のフラグを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "百田夏菜子";`,
      iconProvider: 'MaterialIcons',
      iconName: 'wb-sunny',
      iconColor: 'red',
    },
    {
      title: 'すっくてごらん',
      description: 'タグ「百田夏菜子」のフラグを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "百田夏菜子";`,
      iconProvider: 'MaterialCommunityIcons',
      iconName: 'fishbowl-outline',
      iconColor: 'red',
    },
    {
      title: 'ビタミンB',
      description: 'タグ「百田夏菜子」のフラグを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "百田夏菜子";`,
      iconName: 'B',
      iconColor: 'red',
      iconSize: 32,
    },

    // 涙目のアリス、若大将、
    {
      // 和食の大将 アイコン
      title: '若大将',
      description: 'タグ「玉井詩織」のフラグを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "玉井詩織";`,
      iconName: 'taisho',
      iconColor: '#ffcc66',
      iconSize: 32,
    },
    {
      title: '涙目のアリス',
      description: 'タグ「玉井詩織」のフラグを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "玉井詩織";`,
      iconName: 'namida',
      iconColor: '#ffcc66',
    },
    {
      title: 'Lv.3',
      description: 'タグ「玉井詩織」のフラグを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "玉井詩織";`,
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },
    {
      title: 'Lv.4',
      description: 'タグ「玉井詩織」のフラグを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "玉井詩織";`,
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },

    // ももクロのアイドル、反抗期、あーりんロボ、シュークリーム
    {
      // ハートアイコン
      title: 'ももクロのアイドル',
      description: 'タグ「佐々木彩夏」のフラグを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "佐々木彩夏";`,
      iconProvider: 'AntDesign',
      iconName: 'heart',
      iconColor: '#F58E7D',
    },
    {
      // 青筋アイコン
      title: '反抗期',
      description: 'タグ「佐々木彩夏」のフラグを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "佐々木彩夏";`,
      iconName: 'hankoki',
      iconColor: '#F58E7D',
    },
    {
      // robot
      title: 'あーりんロボ',
      description: 'タグ「佐々木彩夏」のフラグを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "佐々木彩夏";`,
      iconProvider: 'MaterialCommunityIcons',
      iconName: 'robot',
      iconColor: '#F58E7D',
    },
    {
      title: '角煮',
      description: 'タグ「佐々木彩夏」のフラグを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "佐々木彩夏";`,
      iconProvider: 'Feather',
      iconName: 'layers',
      iconColor: '#F58E7D',
    },

    // 鋼少女、しょこららいおん、ウマ娘、幽体離脱
    {
      // 騎士アイコン1
      title: '鋼少女',
      description: 'タグ「高城れに」のフラグを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "高城れに";`,
      iconName: 'hagane',
      iconColor: '#7C2E69',
    },
    {
      // ナス
      title: 'まるごとれにちゃん',
      description: 'タグ「高城れに」のフラグを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "高城れに";`,
      iconName: 'eggplant',
      iconColor: '#7C2E69',
    },
    {
      title: 'ウマ娘',
      description: 'タグ「高城れに」のフラグを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "高城れに";`,
      iconProvider: 'FontAwesome5',
      iconName: 'horse',
      iconColor: '#7C2E69',
      iconSize: 30,
    },
    {
      title: 'Lv.4',
      description: 'タグ「高城れに」のフラグを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: `SELECT COUNT(1) AS count FROM place_master WHERE ${whereCond} AND tag = "高城れに";`,
      iconName: 'eggplant',
      iconColor: '#7C2E69',
    },
  ];

  const promises = [];
  awardList.forEach((award) => {
    promises.push(GetSqlResult(award.getCountSQL));
  });
  const p = Promise.all(promises).then((values) => {
    values.forEach((value, index) => {
      awardList[index].getCount = value;
    });
    return awardList;
  });
  return p;
}

async function GetSqlResult(sql, params = []) {
  const db = SQLite.openDatabase('test.db');
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, res) => { resolve(res.rows._array[0].count); },
        (_, error) => { console.log(error); },
      );
    });
  });
}
