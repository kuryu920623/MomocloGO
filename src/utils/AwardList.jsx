import * as SQLite from 'expo-sqlite';

export default async function GetAwardList() {
  // iconSizeのデフォルトは48
  const awardList = [
    {
      title: '弐桃兵',
      description: '聖地のメダルを 1 個獲得する。',
      targetCount: 1,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#C47222',
    },
    {
      title: '壱桃兵',
      description: '聖地のメダルを 5 個獲得する。',
      targetCount: 5,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#C47222',
    },
    {
      title: '上桃兵',
      description: '聖地のメダルを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#A0A0A0',
    },
    {
      title: '桃伍長',
      description: '聖地のメダルを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#A0A0A0',
    },

    {
      title: '桃軍曹',
      description: '聖地のメダルを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#E8DC00',
    },
    {
      title: '桃曹長',
      description: '聖地のメダルを 200 個獲得する。',
      targetCount: 200,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#E8DC00',
    },
    {
      title: '桃少尉',
      description: '聖地のメダルを 300 個獲得する。',
      targetCount: 300,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#444444',
    },
    {
      title: '桃大尉',
      description: '聖地のメダルを 500 個獲得する。',
      targetCount: 500,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#444444',
    },

    {
      title: 'こってりパトロール見習い隊員',
      description: 'こってりパトロールで紹介されたお店のメダルを 1 個獲得する。',
      targetCount: 1,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#C47222',
    },
    {
      title: 'こってりパトロール正隊員',
      description: 'こってりパトロールで紹介されたお店のメダルを 5 個獲得する。',
      targetCount: 5,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#A0A0A0',
    },
    {
      title: 'こってりパトロール司令官',
      description: 'こってりパトロールで紹介されたお店のメダルを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#E8DC00',
    },
    {
      title: 'こってりパトロール総監',
      description: 'こってりパトロールで紹介されたお店のメダルを 20 個獲得する。',
      targetCount: 20,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#444444',
    },

    {
      title: 'デコノフ Lv.1',
      description: 'タグ「百田夏菜子」のメダルを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "百田夏菜子";',
      iconProvider: 'MaterialIcons',
      iconName: 'wb-sunny',
      iconColor: 'red',
    },
    {
      title: 'デコノフ Lv.2',
      description: 'タグ「百田夏菜子」のメダルを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "百田夏菜子";',
      iconProvider: 'MaterialIcons',
      iconName: 'wb-sunny',
      iconColor: 'red',
    },
    {
      title: 'デコノフ Lv.3',
      description: 'タグ「百田夏菜子」のメダルを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "百田夏菜子";',
      iconProvider: 'MaterialIcons',
      iconName: 'wb-sunny',
      iconColor: 'red',
    },
    {
      title: 'デコノフ Lv.4',
      description: 'タグ「百田夏菜子」のメダルを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "百田夏菜子";',
      iconProvider: 'MaterialIcons',
      iconName: 'wb-sunny',
      iconColor: 'red',
    },

    {
      title: 'タマノフ Lv.1',
      description: 'タグ「玉井詩織」のメダルを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },
    {
      title: 'タマノフ Lv.2',
      description: 'タグ「玉井詩織」のメダルを 10 個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },
    {
      title: 'タマノフ Lv.3',
      description: 'タグ「玉井詩織」のメダルを 30 個獲得する。',
      targetCount: 30,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },
    {
      title: 'タマノフ Lv.4',
      description: 'タグ「玉井詩織」のメダルを 50 個獲得する。',
      targetCount: 50,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
      iconName: 'sunflower',
      iconColor: '#ffcc66',
    },

    {
      title: 'プニノフ Lv.1',
      description: 'タグ「佐々木彩夏」のメダルを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
      iconProvider: 'AntDesign',
      iconName: 'heart',
      iconColor: '#F58E7D',
    },

    {
      title: 'タカノフ Lv.1',
      description: 'タグ「高城れに」のメダルを 3 個獲得する。',
      targetCount: 3,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1 AND tag = "玉井詩織";',
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
