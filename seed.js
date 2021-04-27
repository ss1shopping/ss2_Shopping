const Item = require("./schema/item.schema")
const Category = require("./schema/categories")

module.exports = importdata = async () => {


 
// MENSWEAR
  
  //MENSWEAR ACCESSORIES

  const menwatch = new Category({
    name: "watch",
    path: "/root/menswear/accessories/watch",
    desc: "watch"

  })
  const menwatchS = await menwatchS.save()

  const menjewelry = new Category({
    name: "Jewelry",
    path: "/root/menswear/accessories/jewelry",
    desc: "jewelry"

  })
  const menjewelryS = await menjewelry.save()

  const menglasses = new Category({
    name: "Glasses",
    path: "/root/menswear/accessories/glasses",
    desc: "glasses"

  })
  const menglassesS = await menglasses.save()

  const mensockglove= new Category({
    name: "Socks/Gloves",
    path: "/root/menswear/accessories/sockglove",
    desc: "socks/gloves"

  })
  const mensockgloveS = await mensockglove.save()

  const mentie= new Category({
    name: "Tie",
    path: "/root/menswear/accessories/tie",
    desc: "tie"

  })
  const mentieS = await mentie.save()

  const menshawl= new Category({
    name: "Shawl",
    path: "/root/menswear/accessories/shawl",
    desc: "shawl"

  })
  const menshawlS = await menshawl.save()

  const menbelt= new Category({
    name: "Belt",
    path: "/root/menswear/accessories/belt",
    desc: "belt"

  })
  const menbeltS = await menbelt.save()

  const menhatcap= new Category({
    name: "Hat/Cap",
    path: "/root/menswear/accessories/hatcap",
    desc: "hat/cap"

  })
  const menhatcapS = await menhatcap.save()

  const menaccessories = new Category({
    name: "Accessories",
    path: "/root/menswear/accessories",
    desc: "accessories",
    children: [menhatcapS._id, menbriefcase._id, mentieS._id, menglassesS._id, menshawlS._id, mensockgloveS._id, menjewelryS._id, menwatchS._id]
  })
  const menaccessoriesS = await menaccessories.save()

  //MENSWEAR WALLET,BAG

  const menbriefcase= new Category({
    name: "Briefcase",
    path: "/root/menswear/bagwallet/briefcase",
    desc: "briefcase"

  })
  const menbriefcaseS = await menbriefcase.save()

  const menbackpack = new Category({
    name: "Backpack",
    path: "/root/menswear/bagwallet/backpack",
    desc: "backpack"

  })
  const menbackpackS = await menbackpack.save()

  const mencrossbody = new Category({
    name: "Crossbody",
    path: "/root/menswear/bagwallet/crossbody",
    desc: "crossbody"

  })
  const mencrossbodyS = await mencrossbody.save()

  const menfannypack = new Category({
    name: "Fanny Pack",
    path: "/root/menswear/bagwallet/fannypack",
    desc: "fanny pack"

  })
  const menfannypackS = await menfannypack.save()

  const menshoulderbag = new Category({
    name: "Shoulder Bag",
    path: "/root/menswear/bagwallet/shoulderbag",
    desc: "shoulder bag"

  })
  const menshoulderbagS = await menshoulderbag.save()

  const menwallet = new Category({
    name: "Wallet",
    path: "/root/menswear/bagwallet/wallet",
    desc: "wallet"

  })
  const menwalletS = await menwallet.save()

  const menbagwallet = new Category({
    name: "Bag/Wallet",
    path: "/root/menswear/bagwallet",
    desc: "bag/wallet",
    children: [menwalletS._id, menshoulderbagS._id, mencrossbodyS._id, menbackpackS._id, menfannypackS._id, menbriefcaseS._id]
  })
  const menbagwallerS = await menbagwallet.save()


  //MENSWEAR PANTS

  const mentrousers = new Category({
    name: "Trousers",
    path: "/root/menswear/pant/trousers",
    desc: "pant"

  })
  const mentrousersS = await mentrousers.save()

  const menunderwear = new Category({
    name: "Underwear",
    path: "/root/menswear/pant/underwear",
    desc: "underwear"

  })
  const menunderwearS = await menunderwear.save()

  const menkaki = new Category({
    name: "Kaki",
    path: "/root/menswear/pant/kaki",
    desc: "kaki"

  })
  const menkakiS = await menkaki.save()

  const mensport = new Category({
    name: "Sport Pant",
    path: "/root/menswear/pant/sport",
    desc: "sport"

  })
  const mensportS = await mensport.save()

  const menshort = new Category({
    name: "Short",
    path: "/root/menswear/pant/short",
    desc: "short"

  })
  const menshortS = await menshort.save()

  const menjean = new Category({
    name: "Jean",
    path: "/root/menswear/pant/jean",
    desc: "pant"

  })
  const menjeanS = await menjean.save()
  
  const menpant = new Category({
    name: "Pant",
    path: "/root/menswear/pant",
    desc: "pant",
    children: [menjeanS._id, menshortS._id, mensportS._id, menkakiS._id, mentrousersS._id, menunderwearS._id]
  })
  const menpantS = await menpant.save()


  //MENSWEAR JACKET
  
  const mencardigan = new Category({
    name: "Cardigan",
    path: "/root/menswear/jacket/cardigan",
    desc: "cargigan"

  })
  const mencardiganS = await mencardigan.save()

  const menwindbreaker = new Category({
    name: "Windbreaker",
    path: "/root/menswear/jacket/windbreaker",
    desc: "winbreaker"

  })
  const menwindbreakerS = await menwindbreaker.save()

  const menleather = new Category({
    name: "Leather Jacket",
    path: "/root/menswear/jacket/leather",
    desc: "leather"

  })
  const menleatherS = await menleather.save()

  const menvest = new Category({
    name: "Vest",
    path: "/root/menswear/jacket/vest",
    desc: "vest"

  })
  const menvestS = await menvest.save()

  const mendenim = new Category({
    name: "Denim",
    path: "/root/menswear/jacket/denim",
    desc: "denim"

  })
  const mendenimS = await mendenim.save()

  const menblazer = new Category({
    name: "Blazer",
    path: "/root/menswear/jacket/blazer",
    desc: "blazer"

  })
  const menblazerS = await menblazer.save()

  const menjacket = new Category({
    name: "Jacket",
    path: "/root/menswear/jacket",
    desc: "jacket",
    children: [menblazerS._id, mendenimS._id, menvestS._id, menleatherS._id, menwindbreakerS._id, mencardiganS._id]
  })
  const menjacketS = await menjacket.save()


  //MENSWEAR SHIRT
  
  const mensweater = new Category({
    name: "Sweater",
    path: "/root/menswear/shirt/sweater",
    desc: "sweater"

  })
  const mensweaterS = await mensweater.save() 

  const mensweatshirt = new Category({
    name: "Sweatshirt",
    path: "/root/menswear/shirt/sweatshirt",
    desc: "sweatshirt"

  })
  const mensweatshirtS = await mensweatshirt.save() 

  const mentshirt = new Category({
    name: "T-Shirt",
    path: "/root/menswear/shirt/tshirt",
    desc: "t-shirt"

  })
  const mentshirtS = await mentshirt.save() 

  const menlongsleeve = new Category({
    name: "Long-sleeved Shirt",
    path: "/root/menswear/shirt/longsleeve",
    desc: "long-sleeved shirt"

  })
  const menlongsleeveS = await menlongsleeve.save()  

  const menpolo = new Category({
    name: "Polo",
    path: "/root/menswear/shirt/polo",
    desc: "polo"

  })
  const menpoloS = await menpolo.save()  

  const menshirt = new Category({
    name: "Shirt",
    path: "/root/menswear/shirt",
    desc: "shirt",
    children: [menpoloS._id, menlongsleeveS._id, mentshirtS._id, mensweatshirtS._id, mensweaterS._id]

  })
  const menshirtS = await menshirt.save()

  const menswear = new Category({
    name: "Menswear",
    path: "/root/menswear",
    desc: "menswear",
    icon: "/images/menswear.png",
    children: [menshirtS._id, menjacketS._id, menpantS._id, menbagwallerS._id, menaccessoriesS._id]
  })
  const menswearS = await menswear.save()

  
//WOMENSWEAR

  //WOMENSWEAR COAT

  const womenbomber = new Category({
    name: "Bomber Jacket",
    path: "/root/womenswear/coat/bomber",
    desc: "bomber"
  })
  const womenbomberS = await womenbomber.save() 

  const womenleather = new Category({
    name: "Leather Jacket",
    path: "/root/womenswear/coat/leather",
    desc: "leather"
  })
  const womenleatherS = await womenleather.save() 

  const womenjean = new Category({
    name: "Jean Jacket",
    path: "/root/womenswear/coat/jean",
    desc: "jean"
  })
  const womenjeanS = await womenjean.save() 

  const womencardigan = new Category({
    name: "Cardigan",
    path: "/root/womenswear/coat/cardigan",
    desc: "cardigan"
  })
  const womencardiganS = await womencardigan.save() 

  const womenvestblazer = new Category({
    name: "Vest/Blazed",
    path: "/root/womenswear/coat/vestblazer",
    desc: "vest/blazer"
  })
  const womenvestblazerS = await womenvestblazer.save() 

  const womencoat = new Category({
    name: "Coat",
    path: "/root/womenswear/coat",
    desc: "coat",
    children: [womenvestblazerS._id, womencardiganS._id, womenjeanS._id, womenleatherS._id, womenbomberS._id]
  })
  const womencoatS = await womencoat.save() 

  //WOMENSWEAR UNDERWEAR/PIJAMA

  const womenpijama = new Category({
    name: "Pijama",
    path: "/root/womenswear/underpija/pijama",
    desc: "pijama"

  })
  const womenpijamaS = await womenpijama.save() 

  const womenlingerie = new Category({
    name: "Lingerie",
    path: "/root/womenswear/underpija/lingerie",
    desc: "lingerie"

  })
  const womenlingerieS = await womenlingerie.save() 

  const womenabra = new Category({
    name: "Bra",
    path: "/root/womenswear/underpija/bra",
    desc: "bra"

  })
  const womenbraS = await womenabra.save()  

  const womenunderpija = new Category({
    name: "Underwear/Pijama",
    path: "/root/womenswear/underpija",
    desc: "underwear/pijama",
    children: [womenbraS._id, womenlingerieS._id, womenpijamaS._id]
  })
  const womendressS = await womendress.save() 

  //WOMENSWEAR SKIRT

  const womenaline = new Category({
    name: "A Line Skirt",
    path: "/root/womenswear/skirt/aline",
    desc: "alineskirt"

  })
  const womenalineS = await womenaline.save()  

  const womenbabydoll = new Category({
    name: "Babydoll",
    path: "/root/womenswear/skirt/babydoll",
    desc: "babydoll"

  })
  const womenbabydollS = await womenbabydoll.save()  

  const womenlongskirt = new Category({
    name: "Long Skirt",
    path: "/root/womenswear/skirt/long",
    desc: "longskirt"

  })
  const womenlongskirtS = await womenlongskirt.save()  

  const womenminiskirt = new Category({
    name: "Miniskirt",
    path: "/root/womenswear/skirt/mini",
    desc: "miniskirt"

  })
  const womenminiskirtS = await womenminiskirt.save()  

  const womenskirt = new Category({
    name: "Skirt",
    path: "/root/womenswear/skirt",
    desc: "skirt",
    children: [womenminiskirtS._id, womenlongskirtS._id, womenbabydollS._id, womenalineS._id]
  })
  const womenskirtS = await womenskirt.save() 

  //WOMENSWEAR DRESS

  const womenloosedress = new Category({
    name: "Loose Dress",
    path: "/root/womenswear/dress/loosedress",
    desc: "loosedress"

  })
  const womenloosedressS = await womenloosedress.save()  

  const womentightdress = new Category({
    name: "Tight Dress",
    path: "/root/womenswear/dress/tightdress",
    desc: "tightdress"

  })
  const womentightdressS = await womentightdress.save()  

  const womenlongdress = new Category({
    name: "Long Dress",
    path: "/root/womenswear/dress/longdress",
    desc: "longdress"

  })
  const womenlongdressS = await womenlongdress.save()  

  const womenshortdress = new Category({
    name: "Short Dress",
    path: "/root/womenswear/dress/shortdress",
    desc: "shortdress"

  })
  const womenshortdressS = await womenshortdress.save()  

  const womendress = new Category({
    name: "Dess",
    path: "/root/womenswear/dress",
    desc: "dress",
    children: [womenshortdressS._id, womenlongdressS._id, womentightdressS._id, womenloosedressS._id]
  })
  const womendressS = await womendress.save() 


  //WOMENSWEAR TOP

  const womenmodernwear = new Category({
    name: "Modern Wear",
    path: "/root/womenswear/top/modernwear",
    desc: "modernwear"

  })
  const womenmodernwearS = await womenmodernwearS.save()  
  
  const womencroptop = new Category({
    name: "Crop Top",
    path: "/root/womenswear/top/croptop",
    desc: "croptop"

  })
  const womencroptopS = await womencroptop.save()  

  const womenshirt = new Category({
    name: "Shirt",
    path: "/root/womenswear/top/shirt",
    desc: "shirt"

  })
  const womenshirtS = await womenshirt.save()  

  const womentop = new Category({
    name: "Top",
    path: "/root/womenswear/top",
    desc: "top",
    children: [womenshirtS._id, womencroptopS._id, womenmodernwearS._id]

  })
  const womentopS = await womentop.save()  

  const womenswear = new Category({
    name: "Womenswear",
    path: "/root/womenswear",
    desc: "womenswear",
    icon: "/images/womenswear.png",
    children: [womentopS._id, womendressS._id, womencoatS._id, womenunderpija._id, womenskirtS._id]
  })
  const womenswearS = await womenswear.save()


//PHONE & TABLET

  //ACCESSORIES

  const ptsim = new Category({
    name: "Sim",
    path: "/root/phonetab/accessories/sim",
    desc: "sim"

  })
  const ptsimS = await ptsim.save()

  const ptbattery = new Category({
    name: "Battery",
    path: "/root/phonetab/accessories/battery",
    desc: "battery"

  })
  const ptbatteryS = await ptbattery.save()

  const cablecharger = new Category({
    name: "Cable/Charger",
    path: "/root/phonetab/accessories/cablecharger",
    desc: "cablecharger"

  })
  const cablechargerS = await cablecharger.save()

  const backupbattery = new Category({
    name: "Rechargeable Battery",
    path: "/root/phonetab/accessories/backupbattery",
    desc: "backupbattery"

  })
  const backupbatteryS = await backupbattery.save()

  const ptaccessories = new Category({
    name: "Accessories",
    path: "/root/phonetab/accessories",
    desc: "accessories",
    children: [backupbatteryS._id, cablechargerS._id, ptbatteryS._id, ptsimS._id]

  })
  const ptaccessoriesS = await ptaccessories.save()

  //SCREEN PROTECTOR
  const screenprotector = new Category({
    name: "Screen Protector",
    path: "/root/phonetab/screenprotector",
    desc: "screenprotector"

  })
  const screenprotectorS = await screenprotector.save()

  //CASES
  const casecover = new Category({
    name: "Case/Cover",
    path: "/root/phonetab/casecover",
    desc: "case/cover"

  })
  const casecoverS = await casecover.save()
  
  //TABLET

  const tabletother = new Category({
    name: "Others",
    path: "/root/phonetab/tablet/other",
    desc: "others"

  })
  const tabletotherS = await tabletother.save()

  const tabletkindle = new Category({
    name: "Kindle",
    path: "/root/phonetab/tablet/kindle",
    desc: "kindle"

  })
  const tabletkindleS = await tabletkindle.save()

  const tabletIpad = new Category({
    name: "Ipad",
    path: "/root/phonetab/tablet/ipad",
    desc: "ipad"

  })
  const tabletIpadS = await tabletIpad.save()

  const tablet = new Category({
    name: "Tablets",
    path: "/root/phonetab/tablet",
    desc: "tablet",
    children: [tabletIpadS._id, tabletkindleS._id, tabletotherS._id]

  })
  const tabletS = await tablet.save()

  //PHONE
  const smartphone = new Category({
    name: "Smartphone",
    path: "/root/phonetab/phone/smart",
    desc: "smartphone"

  })
  const smartphoneS = await smartphone.save()

  const casualphone = new Category({
    name: "Casual Phone",
    path: "/root/phonetab/phone/casual",
    desc: "casualphone"

  })
  const casualphoneS = await casualphone.save()

  const phone = new Category({
    name: "Phone",
    path: "/root/phonetab/phone",
    desc: "phone",
    children: [casualphoneS._id, smartphoneS._id]

  })
  const phoneS = await phone.save()


  const phonetab = new Category({
    name: "Phone & Tablet",
    path: "/root/phonetab",
    desc: "phone/tablet",
    icon: "/images/phonetab.png",
    children: [phoneS._id, tabletS._id, casecoverS._id, screenprotectorS._id, ptaccessoriesS._id]

  })
  const phonetabS = await phonetab.save()


//ELECTRONIC

  //WEARABLE
  const wearable = new Category({
    name: "Wearable",
    path: "/root/electronic/wearable",
    desc: "wearable"
  })
  const wearableS = await wearable.save()

  //TV
  const tv = new Category({
    name: "TV",
    path: "/root/electronic/tv",
    desc: "tv"
  })
  const tvS = await tv.save()

  //ACCESSORIES & GAMING
  const accessgaming = new Category({
    name: "Accessories & Gaming",
    path: "/root/electronic/accessgaming",
    desc: "access&gaming"
  })
  const accessgamingS = await accessgaming.save()

  //HEADPHONE
  const overear = new Category({
    name: "Over-ear Headphone",
    path: "/root/electronic/audio/overear",
    desc: "over"
  })
  const overearS = await overear.save()

  const onear = new Category({
    name: "On-ear Headphone",
    path: "/root/electronic/audio/onear",
    desc: "onear"
  })
  const onearS = await onear.save()

  const inear = new Category({
    name: "In-ear Headphone",
    path: "/root/electronic/audio/inear",
    desc: "inear"
  })
  const inearS = await inear.save()

  const headphone = new Category({
    name: "Headphone",
    path: "/root/electronic/headphone",
    desc: "headphone",
    children: [inearS._id, onearS._id, overearS._id]

  })
  const headphoneS = await headphone.save()

  //AUDIO
  const karaoke = new Category({
    name: "Karaoke",
    path: "/root/electronic/audio/karaoke",
    desc: "karaoke"
  })
  const karaokeS = await karaoke.save()

  const mediaplayer = new Category({
    name: "Media Player",
    path: "/root/electronic/audio/mediaplayer",
    desc: "mediaplayer"
  })
  const mediaplayerS = await mediaplayer.save()

  const speaker = new Category({
    name: "Speaker",
    path: "/root/electronic/audio/speaker",
    desc: "speaker"
  })
  const speakerS = await speaker.save()

  const audio = new Category({
    name: "Audio",
    path: "/root/electronic/audio",
    desc: "audio",
    children: [speakerS._id, mediaplayerS._id, karaokeS._id]

  })
  const audioS = await audio.save()

  const electronic = new Category({
    name: "Electronic",
    path: "/root/electronic",
    desc: "electronic",
    icon: "/images/electronic.png",
    children: [audioS._id, headphoneS._id, accessgamingS._id, tvS._id, wearableS._id]

  })
  const electronicS = await electronic.save()

//BEAUTY 
  //SHAMPOO, SHOWER GEL
  const shamshow = new Category({
    name: "Shampoo & Shower Gel",
    path: "/root/beauty/shamshow",
    desc: "shamshow"

  })
  const shamshowS = await shamshow.save()

  //MEN'S COSMETICS
  const beardcare = new Category({
    name: "Beard Care",
    path: "/root/beauty/menscos/beardcare",
    desc: "beardcare"

  })
  const beardcareS = await beardcare.save()

  const pomade = new Category({
    name: "Pomade",
    path: "/root/beauty/menscos/pomade",
    desc: "pomade"

  })
  const pomadeS = await pomade.save()

  const bodyspray = new Category({
    name: "Body Spray",
    path: "/root/beauty/menscos/bodyspray",
    desc: "bodyspray"

  })
  const bodysprayS = await bodyspray.save()

  const menscos = new Category({
    name: "Men's Cosmetic",
    path: "/root/beauty/menscos",
    desc: "menscos",
    children: [bodysprayS._id, pomadeS._id, beardcareS._id]

  })
  const menscosS = await menscos.save()

  //MAKEUP
  const eyemakeup = new Category({
    name: "Eyes Makeup",
    path: "/root/beauty/makeup/eye",
    desc: "eyemakeup"

  })
  const eyemakeupS = await eyemakeup.save()

  const skinmakeup = new Category({
    name: "Skin Makeup",
    path: "/root/beauty/makeup/skin",
    desc: "skinmakeup"

  })
  const skinmakeupS = await skinmakeup.save()

  const lipstick = new Category({
    name: "Lipstick",
    path: "/root/beauty/makeup/lipstick",
    desc: "lipstick"

  })
  const lipstickS = await lipstick.save()

  const makeup = new Category({
    name: "Makeup",
    path: "/root/beauty/makeup",
    desc: "makeup",
    children: [lipstickS._id, skinmakeupS._id, eyemakeupS._id]

  })
  const makeupS = await makeup.save()

  //SKIN CARE
  const serum = new Category({
    name: "Serum",
    path: "/root/beauty/skincare/serum",
    desc: "serum"

  })
  const serumS = await serum.save()

  const lotion = new Category({
    name: "Lotion",
    path: "/root/beauty/skincare/lotion",
    desc: "lotion"

  })
  const lotionS = await lotion.save()

  const mineralspray = new Category({
    name: "Mineral Spray",
    path: "/root/beauty/skincare/mineralspray",
    desc: "mineralspray"

  })
  const mineralsprayS = await mineralspray.save()

  const mask = new Category({
    name: "Mask",
    path: "/root/beauty/skincare/mask",
    desc: "mask"

  })
  const maskS = await mask.save()

  const sunscreen = new Category({
    name: "Sunscress",
    path: "/root/beauty/skincare/sunscreen",
    desc: "sunscreen"

  })
  const sunscreenS = await sunscreen.save()

  const cleanser = new Category({
    name: "Cleanser",
    path: "/root/beauty/skincare/cleanser",
    desc: "cleanser"

  })
  const cleanserS = await cleanser.save()

  const skincare = new Category({
    name: "Skin Care",
    path: "/root/beauty/skincare",
    desc: "skincare",
    children: [cleanserS._id, sunscreenS._id, maskS._id, lotionS._id, serumS._id, mineralsprayS._id]

  })
  const skincareS = await skincare.save()

  //PERFUME
  const perfume = new Category({
    name: "Perfume",
    path: "/root/beauty/perfume",
    desc: "perfume"

  })
  const perfumeS = await perfume.save()

  const beauty = new Category({
    name: "Beauty",
    path: "/root/beauty",
    desc: "beauty",
    icon: "/images/beauty.png",
    children: [skincareS._id, makeupS._id, menscosS._id, shamshowS._id, perfumeS._id]

  })
  const beautyS = await beauty.save()

//HEALTH
  const medicine = new Category({
    name: "Medicine",
    path: "/root/health/medicine",
    desc: "medicine"

  })
  const medicineS = await medicine.save()

  const dietary = new Category({
    name: "Dietary Supplement",
    path: "/root/health/dietary",
    desc: "dietary supplement"

  })
  const dietaryS = await dietary.save()

  const vitamin = new Category({
    name: "Vitamin",
    path: "/root/health/vitamin",
    desc: "vitamin"

  })
  const vitaminS = await vitamin.save()

  const medicaleq = new Category({
    name: "Medical Equipment",
    path: "/root/health/medicaleq",
    desc: "medical equipment"

  })
  const medicaleqS = await medicaleq.save()

  const health = new Category({
    name: "Health Care",
    path: "/root/health",
    desc: "health",
    icon: "/images/health.png",
    children: [medicaleqS._id, medicineS._id, vitaminS._id, dietaryS._id]

  })
  const healthS = await health.save()

//FOOTWEAR
  const saccess = new Category({
    name: "Shoes Accessories",
    path: "/root/footwear/saccess",
    desc: "accessories"

  })
  const saccessS = await saccess.save()

  const heelclog = new Category({
    name: "High Heels/Clogs",
    path: "/root/footwear/heelclog",
    desc: "highheels/clogs"

  })
  const heelclogS = await heelclog.save()

  const westernshoes = new Category({
    name: "Western Shoes",
    path: "/root/footwear/western",
    desc: "westernshoes"

  })
  const westernshoesS = await westernshoes.save()

  const slipper = new Category({
    name: "Slipper",
    path: "/root/footwear/slipper",
    desc: "slipper"

  })
  const slipperS = await slipper.save()

  const sneaker = new Category({
    name: "Sneaker",
    path: "/root/footwear/sneaker",
    desc: "sneaker"

  })
  const sneakerS = await sneaker.save()


  const boots = new Category({
    name: "Boots",
    path: "/root/footwear/boots",
    desc: "boots"

  })
  const bootsS = await boots.save()


  const sandal = new Category({
    name: "Sandal",
    path: "/root/footwear/sandal",
    desc: "footwear"

  })
  const sandalS = await sandal.save()

  const footwear = new Category({
    name: "Footwear",
    path: "/root/footwear",
    desc: "footwear",
    icon: "/images/footwear.png",
    children: [sandalS._id, bootsS._id, sneakerS._id, slipperS._id, westernshoesS._id, heelclogS._id, saccessS._id]

  })
  const footwearS = await footwear.save()

//HOUSEHOLD APPLIANCES
  //LARGE EQUIPMENT

  const khood = new Category({
    name: "Kitchen Hood",
    path: "/root/houseapp/lequip/khood",
    desc: "kitchen hood"
  })
  const khoodS = await khood.save()

  const freezer = new Category({
    name: "Freezer",
    path: "/root/houseapp/lequip/freezer",
    desc: "freezer"
  })
  const freezerS = await freezer.save()

  const wapu = new Category({
    name: "Water Purifier",
    path: "/root/houseapp/lequip/wapu",
    desc: "water purifier"
  })
  const wapuS = await wapu.save()

  const refrige = new Category({
    name: "Refrigerator",
    path: "/root/houseapp/lequip/refrige",
    desc: "refrigerator"
  })
  const refrigeS = await refrige.save()

  const washdry = new Category({
    name: "Washing % Drying Machine",
    path: "/root/houseapp/lequip/washdry",
    desc: "washing/drying machine"
  })
  const washdryS = await washdry.save()

  const lequip = new Category({
    name: "Large Equiment",
    path: "/root/houseapp/lequip",
    desc: "large equipment",
    children: [washdryS._id, refrigeS._id, wapuS._id, freezerS._id, khoodS._id]
  })
  const lequipS = await lequip.save()

  //CLEANING
  const dust = new Category({
    name: "Dust Blower",
    path: "/root/houseapp/clean/dust",
    desc: "dustblower"
  })
  const dustS = await dust.save()

  const vacuum = new Category({
    name: "Vacuum Cleaner",
    path: "/root/houseapp/clean/vacuum",
    desc: "vacuum"
  })
  const vacuumS = await vacuum.save()

  const cleaning = new Category({
    name: "Cleaning Equiment",
    path: "/root/houseapp/clean",
    desc: "cleaning",
    children: [vacuumS._id, dustS._id]
  })
  const cleaningS = await cleaning.save()

  //CLOTHING CARE
  const sewing = new Category({
    name: "Sewing Machine",
    path: "/root/houseapp/clothcare/sewing",
    desc: "sewing"
  })
  const sewingS = await sewing.save()

  const iron = new Category({
    name: "Iron",
    path: "/root/houseapp/clothcare/iron",
    desc: "iron"
  })
  const ironS = await iron.save()

  const clothcare = new Category({
    name: "Clothing Care",
    path: "/root/houseapp/clothcare",
    desc: "clothingcare",
    children: [ironS._id, sewingS._id]
  })
  const clothcareS = await clothcare.save()

  //FAN & AIR CONDITIONER

  const dehumid = new Category({
    name: "Deumidifier",
    path: "/root/houseapp/fanair/dehumid",
    desc: "dehumidifier"
  })
  const dehumidS = await dehumid.save()

  const heater = new Category({
    name: "Heater",
    path: "/root/houseapp/fanair/heater",
    desc: "heater"
  })
  const heaterS = await heater.save()

  const waterheat = new Category({
    name: "Electric Water Heater",
    path: "/root/houseapp/fanair/waterheat",
    desc: "electric water heater"
  })
  const waterheatS = await waterheat.save()

  const humid = new Category({
    name: "Humidifier",
    path: "/root/houseapp/fanair/humid",
    desc: "humidifier"
  })
  const humidS = await humid.save()

  const aircon = new Category({
    name: "Air-conditioner",
    path: "/root/houseapp/fanair/aircon",
    desc: "aircon"
  })
  const airconS = await aircon.save()

  const fan = new Category({
    name: "Fan",
    path: "/root/houseapp/fanair/fan",
    desc: "fan"
  })
  const fanS = await fan.save()

  const fanair = new Category({
    name: "Fan & Air-conditioner",
    path: "/root/houseapp/fanair",
    desc: "fan/aircon",
    children: [fanS._id, airconS._id, humidS._id, waterheatS._id, heaterS._id, dehumidS._id]
  })
  const fanairS = await fanair.save()

  //KITCHEN
  const fryer = new Category({
    name: "Fryer",
    path: "/root/houseapp/kitchen/fryer",
    desc: "fryer"
  })
  const fryerS = await fryer.save()

  const panpot = new Category({
    name: "Pan & Pot",
    path: "/root/houseapp/kitchen/panpot",
    desc: "owen/microwave"
  })
  const panpotS = await panpot.save()

  const ovenmicro = new Category({
    name: "Oven & Microwave",
    path: "/root/houseapp/kitchen/ovenmicro",
    desc: "owen/microwave"
  })
  const ovenmicroS = await ovenmicro.save()

  const baking = new Category({
    name: "Baking",
    path: "/root/houseapp/kitchen/baking",
    desc: "baking"
  })
  const bakingS = await baking.save()

  const stove = new Category({
    name: "Stove",
    path: "/root/houseapp/kitchen/stove",
    desc: "stove"
  })
  const stoveS = await stove.save()

  const cooker = new Category({
    name: "Cooker",
    path: "/root/houseapp/kitchen/cooker",
    desc: "cooker"
  })
  const cookerS = await cooker.save()

  const fprocessor = new Category({
    name: "Food Processor",
    path: "/root/houseapp/kitchen/fprocessor",
    desc: "foodprocessor"
  })
  const fprocessorS = await fprocessor.save()

  const kitchen = new Category({
    name: "Kitchen",
    path: "/root/houseapp/kitchen",
    desc: "kitchen",
    children: [fprocessorS._id, cookerS._id, stoveS._id, panpotS._id, fryerS._id, bakingS._id, ovenmicroS._id]
  })
  const kitchenS = await kitchen.save()

  const houseapp = new Category({
    name: "Household Appliances",
    path: "/root/houseapp",
    desc: "houshold appliances",
    icon: "/images/houseapp.png",
    children: [kitchenS._id, lequipS._id, fanairS._id, cleaningS._id, clothcareS._id]

  })
  const houseappS = await houseapp.save()

//BOOK & EDUCATION
  //BOOK
  const vbook = new Category({
    name: "Vietnamese Book",
    path: "/root/bookedu/vbook",
    desc: "vbook"

  })
  const vbookS = await vbook.save()

  const fbook = new Category({
    name: "Foreign Book",
    path: "/root/bookedu/fbook",
    desc: "fbook"
  })
  const fbookS = await fbook.save()

  const stationery = new Category({
    name: "Stationery",
    path: "/root/bookedu/stationery",
    desc: "stationery"
  })
  const stationeryS = await stationery.save()

  const instrument = new Category({
    name: "Instrument",
    path: "/root/bookedu/instrument",
    desc: "instrument"
  })
  const instrumentS = await instrument.save()

  const souvenir = new Category({
    name: "Souvenir",
    path: "/root/bookedu/souvenir",
    desc: "souvenir"
  })
  const souvenirS = await souvenir.save()

  const bookedu = new Category({
    name: "Books & Education",
    path: "/root/bookedu",
    desc: "bookedu",
    icon: "/images/bookedu.png",
    children: [vbookS._id, fbookS._id, souvenirS._id, stationeryS._id, instrumentS._id, souvenirS._id]

  })
  const bookeduS = await bookedu.save()

//FOOD & DRINK
  //FOOD DRINK
  const milk = new Category({
    name: "Milk",
    path: "/root/fooddrink/milk",
    desc: "mild"
  })
  const milkS = await milk.save()

  const gift = new Category({
    name: "Gift",
    path: "/root/fooddrink/gift",
    desc: "gift"
  })
  const giftS = await gift.save()

  const beverage = new Category({
    name: "Beverage",
    path: "/root/fooddrink/beverage",
    desc: "beverage"
  })
  const beverageS = await beverage.save()

  const cannedpackage = new Category({
    name: "Canned/Package Food",
    path: "/root/fooddrink/canpack",
    desc: "can/package"
  })
  const cannedpackageS = await cannedpackage.save()

  const drink = new Category({
    name: "Drink",
    path: "/root/fooddrink/drink",
    desc: "drink"
  })
  const drinkS = await drink.save()
  
  const snack = new Category({
    name: "Snack",
    path: "/root/fooddrink/snack",
    desc: "snack"
  })
  const snackS = await snack.save()

  const fooddrink = new Category({
    name: "Food & Drink",
    path: "/root/fooddrink",
    desc: "food/drink",
    icon: "/images/fooddrink.png",
    children: [snackS._id, drinkS._id, cannedpackageS._id, beverageS._id, milkS._id, giftS._id]

  })
  const fooddrinkS = await fooddrink.save()

//ROOT  

  const root = new Category({
    name: "root",
    path: "/root",
    desc: "root",
    isRoot: true,
    children: [menswearS._id, womenswearS._id, phonetabS._id, electronicS._id, beautyS._id, healthS._id, footwearS._id, houseappS._id, bookeduS._id, fooddrinkS._id]
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
