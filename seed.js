const Category = require("./schema/categories")
module.exports = importdata = async () => {
  const aongan = new Category({
    name: "aongan",
    path: "/root/men/ao/aongan",
    desc: "clothes",
  })
  const result7 = await aongan.save()

  const ao = new Category({
    name: "ao",
    path: "/root/men/ao",
    desc: "clothes",
    children: [result7._id]
  })
  const result = await ao.save()

  const quan = new Category({
    name: "quan",
    path: "/root/men/quan",
    desc: "clothes",

  })
  const result2 = await quan.save()

  const clothes = new Category({
    name: "clothes",
    path: "/root/men/clothes",
    desc: "clothes",

  })
  const result3 = await clothes.save()
  const girl = new Category({
    name: "girl",
    path: "/root/girl",
    desc: "girl",

  })
  const result4 = await girl.save()
  const may = new Category({
    name: "may",
    path: "/root/may",
    desc: "may",

  })
  const result6 = await may.save()
  const men = new Category({
    name: "men",
    path: "/root/men",
    desc: "men",
    children: [result._id, result2._id, result3._id]
  })
  const result5 = await men.save()
  const root = new Category({
    name: "root",
    path: "/root",
    desc: "root",
    isRoot: true,
    children: [result4._id, result5._id, result6._id]
  }).save()

}

