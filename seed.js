const Item = require("./schema/item.schema")
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
  let quanbo = new Category({
    name: "quanbo",
    path: "/root/men/quan/quanbo",
    desc: "clothes",

  })
  quanbo = await quanbo.save()
  const quan = new Category({
    name: "quan",
    path: "/root/men/quan",
    desc: "clothes",
    children: [quanbo._id]
  })
  const result2 = await quan.save()

  const clothes = new Category({
    name: "clothes",
    path: "/root/men/clothes",
    desc: "clothes",

  })
  const result3 = await clothes.save()
  let aogirl = new Category({
    name: "ao",
    path: "/root/girl/ao",
    desc: "girl",

  })
  aogirl = await aogirl.save()

  const girl = new Category({
    name: "girl",
    path: "/root/girl",
    desc: "girl",
    children: [aogirl._id]
  })
  const result4 = await girl.save()
  const may = new Category({
    name: "may",
    path: "/root/may",
    desc: "may",

  })
  const result6 = await may.save()
  let congnghe = new Category({
    name: "congnghr",
    path: "/root/congnghe",
    desc: "may",

  })
  congnghe = await congnghe.save()
  let mipham = new Category({
    name: "mipham",
    path: "/root/mipham",
    desc: "may",

  })
  mipham = await mipham.save()

  let trangsuc = new Category({
    name: "trangsuc",
    path: "/root/trangsuc",
    desc: "may",

  })
  trangsuc = await trangsuc.save()
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
    children: [result4._id, result5._id, result6._id, congnghe._id, mipham._id, trangsuc._id]
  }).save()

}

// const newitem = new Item({
//   name: "tien1234",
//   priceMin: 12,
//   priceMax: 30,
//   discount: 20,
//   desc: "test",
//   attributes: [{
//     brand: "hih",
//     value: "oko",
//   }, {
//     xuatxu: "ok",
//     value: "china"
//   },
//   ],
//   category: ["6052043ffd654697aa6d5e7b", "6052043ffd654697aa6d5e71", "6052043ffd654697aa6d5e70"],
//   models: [{
//     name: "vang,M",
//     price: 14
//   },
//   {
//     name: "vang,L",
//     price: 10
//   },
//   {
//     name: "den,XL",
//     price: 14
//   },
//   {
//     name: "den,L",
//     price: 13
//   },
//   ],
//   tier_variations: [
//     {
//       option: ["M", "L", "X", "XL"],
//       images: ["test1", "test2", "test3", "test5"],
//       name: "size"
//     },
//     {
//       option: ["mau vang", "mau den", "mau trang", "mau bac"],
//       images: ["test1", "test2", "test3", "test5"],
//       name: "color"
//     }
//   ]

// })
