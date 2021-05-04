const Item = require("./schema/item.schema")
const Category = require("./schema/categories")

module.exports = importdata = async () => {


 
// MENSWEAR
  
  //MENSWEAR ACCESSORIES

  const menwatch = new Category({
    name: "watch",
    path: "/root/menswear/accessories/watch",
    desc: "watch",
    icon: "/images/menwatch.png"
  })
  const menwatchS = await menwatchS.save()

  const menjewelry = new Category({
    name: "Jewelry",
    path: "/root/menswear/accessories/jewelry",
    desc: "jewelry",
    icon: "/images/menjewelry.png"

  })
  const menjewelryS = await menjewelry.save()

  const menglasses = new Category({
    name: "Glasses",
    path: "/root/menswear/accessories/glasses",
    desc: "glasses",
    icon: "/images/menglasses.png"

  })
  const menglassesS = await menglasses.save()

  const mensockglove= new Category({
    name: "Socks/Gloves",
    path: "/root/menswear/accessories/sockglove",
    desc: "socks/gloves",
    icon: "/images/mensockglove.png"

  })
  const mensockgloveS = await mensockglove.save()

  const mentie= new Category({
    name: "Tie",
    path: "/root/menswear/accessories/tie",
    desc: "tie",
    icon: "/images/mentie.png"

  })
  const mentieS = await mentie.save()

  const menbelt= new Category({
    name: "Belt",
    path: "/root/menswear/accessories/belt",
    desc: "belt",
    icon: "/images/menbelt.png"

  })
  const menbeltS = await menbelt.save()

  const menhatcap= new Category({
    name: "Hat/Cap",
    path: "/root/menswear/accessories/hatcap",
    desc: "hat/cap",
    icon: "/images/menhatcap.png"

  })
  const menhatcapS = await menhatcap.save()

  const menaccessories = new Category({
    name: "Accessories",
    path: "/root/menswear/accessories",
    desc: "accessories",
    icon: "/images/menaccessories.png",
    children: [menhatcapS._id, menbriefcase._id, mentieS._id, menglassesS._id, menshawlS._id, mensockgloveS._id, menjewelryS._id, menwatchS._id, menbeltS._id]
  })
  const menaccessoriesS = await menaccessories.save()

  //MENSWEAR WALLET,BAG

  const menbriefcase= new Category({
    name: "Briefcase",
    path: "/root/menswear/bagwallet/briefcase",
    desc: "briefcase",
    icon: "/images/menbriefcase.png"

  })
  const menbriefcaseS = await menbriefcase.save()

  const menbackpack = new Category({
    name: "Backpack",
    path: "/root/menswear/bagwallet/backpack",
    desc: "backpack",
    icon: "/images/menbackpack.png"

  })
  const menbackpackS = await menbackpack.save()

  const mencrossbody = new Category({
    name: "Crossbody Bag",
    path: "/root/menswear/bagwallet/crossbody",
    desc: "crossbody",
    icon: "/images/mencrossbody.png"

  })
  const mencrossbodyS = await mencrossbody.save()

  const menfannypack = new Category({
    name: "Fanny Pack",
    path: "/root/menswear/bagwallet/fannypack",
    desc: "fanny pack",
    icon: "/images/menfannypack.png"

  })
  const menfannypackS = await menfannypack.save()

  const menshoulderbag = new Category({
    name: "Shoulder Bag",
    path: "/root/menswear/bagwallet/shoulderbag",
    desc: "shoulder bag",
    icon: "/images/menshoulderbag.png"

  })
  const menshoulderbagS = await menshoulderbag.save()

  const menwallet = new Category({
    name: "Wallet",
    path: "/root/menswear/bagwallet/wallet",
    desc: "wallet",
    icon: "/images/menwallet.png"

  })
  const menwalletS = await menwallet.save()

  const menbagwallet = new Category({
    name: "Bag/Wallet",
    path: "/root/menswear/bagwallet",
    desc: "bag/wallet",
    icon: "/images/menbagwallet.png",
    children: [menwalletS._id, menshoulderbagS._id, mencrossbodyS._id, menbackpackS._id, menfannypackS._id, menbriefcaseS._id]
  })
  const menbagwallerS = await menbagwallet.save()


  //MENSWEAR PANTS

  const mentrousers = new Category({
    name: "Trousers",
    path: "/root/menswear/pant/trousers",
    desc: "pant",
    icon: "/images/menstrouser.png"

  })
  const mentrousersS = await mentrousers.save()

  const menunderwear = new Category({
    name: "Underwear",
    path: "/root/menswear/pant/underwear",
    desc: "underwear",
    icon: "/images/menunderwear.png"

  })
  const menunderwearS = await menunderwear.save()

  const menkaki = new Category({
    name: "Kaki",
    path: "/root/menswear/pant/kaki",
    desc: "kaki",
    icon: "/images/menkaki.png"

  })
  const menkakiS = await menkaki.save()

  const mensport = new Category({
    name: "Sport Pant",
    path: "/root/menswear/pant/sport",
    desc: "sport",
    icon: "/images/mensport.png"

  })
  const mensportS = await mensport.save()

  const menshort = new Category({
    name: "Short",
    path: "/root/menswear/pant/short",
    desc: "short",
    icon: "/images/menshort.png"

  })
  const menshortS = await menshort.save()

  const menjean = new Category({
    name: "Jean",
    path: "/root/menswear/pant/jean",
    desc: "jean",
    icon: "/images/menjean.png"

  })
  const menjeanS = await menjean.save()
  
  const menpant = new Category({
    name: "Pant",
    path: "/root/menswear/pant",
    desc: "pant",
    icon: "/images/menpant.png",
    children: [menjeanS._id, menshortS._id, mensportS._id, menkakiS._id, mentrousersS._id, menunderwearS._id]
  })
  const menpantS = await menpant.save()


  //MENSWEAR JACKET
  
  const mencardigan = new Category({
    name: "Cardigan",
    path: "/root/menswear/jacket/cardigan",
    desc: "cargigan",
    icon: "/images/mencardigan.png"

  })
  const mencardiganS = await mencardigan.save()

  const menwindbreaker = new Category({
    name: "Windbreaker",
    path: "/root/menswear/jacket/windbreaker",
    desc: "winbreaker",
    icon: "/images/menwindbreaker.png"

  })
  const menwindbreakerS = await menwindbreaker.save()

  const menleather = new Category({
    name: "Leather Jacket",
    path: "/root/menswear/jacket/leather",
    desc: "leather",
    icon: "/images/menleather.png"

  })
  const menleatherS = await menleather.save()

  const menvest = new Category({
    name: "Vest",
    path: "/root/menswear/jacket/vest",
    desc: "vest",
    icon: "/images/menvest.png"

  })
  const menvestS = await menvest.save()

  const mendenim = new Category({
    name: "Denim",
    path: "/root/menswear/jacket/denim",
    desc: "denim",
    icon: "/images/mendenim.png"

  })
  const mendenimS = await mendenim.save()

  const menblazer = new Category({
    name: "Blazer",
    path: "/root/menswear/jacket/blazer",
    desc: "blazer",
    icon: "/images/menblazer.png"

  })
  const menblazerS = await menblazer.save()

  const menjacket = new Category({
    name: "Jacket",
    path: "/root/menswear/jacket",
    desc: "jacket",
    icon: "/images/menjacket.png",
    children: [menblazerS._id, mendenimS._id, menvestS._id, menleatherS._id, menwindbreakerS._id, mencardiganS._id]
  })
  const menjacketS = await menjacket.save()


  //MENSWEAR SHIRT
  
  const mensweater = new Category({
    name: "Sweater",
    path: "/root/menswear/shirt/sweater",
    desc: "sweater",
    icon: "/images/mensweater.png"

  })
  const mensweaterS = await mensweater.save() 

  const mensweatshirt = new Category({
    name: "Sweatshirt",
    path: "/root/menswear/shirt/sweatshirt",
    desc: "sweatshirt",
    icon: "/images/mensweatshirt.png"

  })
  const mensweatshirtS = await mensweatshirt.save() 

  const mentshirt = new Category({
    name: "T-Shirt",
    path: "/root/menswear/shirt/tshirt",
    desc: "t-shirt",
    icon: "/images/mentshirt.png"

  })
  const mentshirtS = await mentshirt.save() 

  const menlongsleeve = new Category({
    name: "Long-sleeved Shirt",
    path: "/root/menswear/shirt/longsleeve",
    desc: "long-sleeved shirt",
    icon: "/images/menlongsleeve.png"

  })
  const menlongsleeveS = await menlongsleeve.save()  

  const menpolo = new Category({
    name: "Polo",
    path: "/root/menswear/shirt/polo",
    desc: "polo",
    icon: "/images/menpolo.png"

  })
  const menpoloS = await menpolo.save()  

  const menshirt = new Category({
    name: "Shirt",
    path: "/root/menswear/shirt",
    desc: "shirt",
    icon: "/images/menshirt.png",
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
    desc: "bomber",
    icon: "/images/womenbomber.png"
  })
  const womenbomberS = await womenbomber.save() 

  const womenleather = new Category({
    name: "Leather Jacket",
    path: "/root/womenswear/coat/leather",
    desc: "leather",
    icon: "/images/womenleather.png"
  })
  const womenleatherS = await womenleather.save() 

  const womenjean = new Category({
    name: "Jean Jacket",
    path: "/root/womenswear/coat/jean",
    desc: "jean",
    icon: "/images/womenjean.png"
  })
  const womenjeanS = await womenjean.save() 

  const womencardigan = new Category({
    name: "Cardigan",
    path: "/root/womenswear/coat/cardigan",
    desc: "cardigan",
    icon: "/images/womencardigan.png"
  })
  const womencardiganS = await womencardigan.save() 

  const womenvestblazer = new Category({
    name: "Vest/Blazed",
    path: "/root/womenswear/coat/vestblazer",
    desc: "vest/blazer",
    icon: "/images/womenvestblazer.png"
  })
  const womenvestblazerS = await womenvestblazer.save() 

  const womencoat = new Category({
    name: "Coat",
    path: "/root/womenswear/coat",
    desc: "coat",
    icon: "/images/womencoat.png",
    children: [womenvestblazerS._id, womencardiganS._id, womenjeanS._id, womenleatherS._id, womenbomberS._id]
  })
  const womencoatS = await womencoat.save() 

  //WOMENSWEAR UNDERWEAR/PIJAMA

  const womenpijama = new Category({
    name: "Pijama",
    path: "/root/womenswear/underpija/pijama",
    desc: "pijama",
    icon: "/images/womenpijama.png"

  })
  const womenpijamaS = await womenpijama.save() 

  const womenlingerie = new Category({
    name: "Lingerie",
    path: "/root/womenswear/underpija/lingerie",
    desc: "lingerie",
    icon: "/images/womenlingerie.png"

  })
  const womenlingerieS = await womenlingerie.save() 

  const womenabra = new Category({
    name: "Bra",
    path: "/root/womenswear/underpija/bra",
    desc: "bra",
    icon: "/images/womenbra.png"

  })
  const womenbraS = await womenabra.save()  

  const womenunderpija = new Category({
    name: "Underwear/Pijama",
    path: "/root/womenswear/underpija",
    desc: "underwear/pijama",
    icon: "/images/womenunderpija.png",
    children: [womenbraS._id, womenlingerieS._id, womenpijamaS._id]
  })
  const womendressS = await womendress.save() 

  //WOMENSWEAR SKIRT

  const womenaline = new Category({
    name: "A Line Skirt",
    path: "/root/womenswear/skirt/aline",
    desc: "alineskirt",
    icon: "/images/womenaline.png"

  })
  const womenalineS = await womenaline.save()  

  const womenlongskirt = new Category({
    name: "Long Skirt",
    path: "/root/womenswear/skirt/long",
    desc: "longskirt",
    icon: "/images/womenlongskirt.png"

  })
  const womenlongskirtS = await womenlongskirt.save()  

  const womenminiskirt = new Category({
    name: "Miniskirt",
    path: "/root/womenswear/skirt/mini",
    desc: "miniskirt",
    icon: "/images/womenminiskirt.png"

  })
  const womenminiskirtS = await womenminiskirt.save()  

  const womenskirt = new Category({
    name: "Skirt",
    path: "/root/womenswear/skirt",
    desc: "skirt",
    icon: "/images/womenskirt.png",
    children: [womenminiskirtS._id, womenlongskirtS._id, womenalineS._id]
  })
  const womenskirtS = await womenskirt.save() 

  //WOMENSWEAR DRESS

  const womenloosedress = new Category({
    name: "Loose Dress",
    path: "/root/womenswear/dress/loosedress",
    desc: "loosedress",
    icon: "/images/womenloosedress.png"

  })
  const womenloosedressS = await womenloosedress.save()  

  const womentightdress = new Category({
    name: "Tight Dress",
    path: "/root/womenswear/dress/tightdress",
    desc: "tightdress",
    icon: "/images/womentightdress.png"

  })
  const womentightdressS = await womentightdress.save()  

  const womenlongdress = new Category({
    name: "Long Dress",
    path: "/root/womenswear/dress/longdress",
    desc: "longdress",
    icon: "/images/womenlongdress.png"

  })
  const womenlongdressS = await womenlongdress.save()  

  const womenshortdress = new Category({
    name: "Short Dress",
    path: "/root/womenswear/dress/shortdress",
    desc: "shortdress",
    icon: "/images/womenshortdress.png"

  })
  const womenshortdressS = await womenshortdress.save()  

  const womendress = new Category({
    name: "Dess",
    path: "/root/womenswear/dress",
    desc: "dress",
    icon: "/images/womendress.png",
    children: [womenshortdressS._id, womenlongdressS._id, womentightdressS._id, womenloosedressS._id]
  })
  const womendressS = await womendress.save() 


  //WOMENSWEAR TOP

  const womenmodernwear = new Category({
    name: "Modern Wear",
    path: "/root/womenswear/top/modernwear",
    desc: "modernwear",
    icon: "/images/womenmodernwear.png"

  })
  const womenmodernwearS = await womenmodernwearS.save()  
  
  const womencroptop = new Category({
    name: "Crop Top",
    path: "/root/womenswear/top/croptop",
    desc: "croptop",
    icon: "/images/womencroptop.png"

  })
  const womencroptopS = await womencroptop.save()  

  const womenshirt = new Category({
    name: "Shirt",
    path: "/root/womenswear/top/shirt",
    desc: "shirt",
    icon: "/images/womenshirt.png"

  })
  const womenshirtS = await womenshirt.save()  

  const womentop = new Category({
    name: "Top",
    path: "/root/womenswear/top",
    desc: "top",
    icon: "/images/womentop.png",
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
    desc: "sim",
    icon: "/images/ptsim.png"

  })
  const ptsimS = await ptsim.save()

  const ptbattery = new Category({
    name: "Battery",
    path: "/root/phonetab/accessories/battery",
    desc: "battery",
    icon: "/images/ptbattery.png"

  })
  const ptbatteryS = await ptbattery.save()

  const cablecharger = new Category({
    name: "Cable/Charger",
    path: "/root/phonetab/accessories/cablecharger",
    desc: "cablecharger",
    icon: "/images/cablecharger.png"

  })
  const cablechargerS = await cablecharger.save()

  const backupbattery = new Category({
    name: "Rechargeable Battery",
    path: "/root/phonetab/accessories/backupbattery",
    desc: "backupbattery",
    icon: "/images/backupbattery.png"

  })
  const backupbatteryS = await backupbattery.save()

  const ptaccessories = new Category({
    name: "Accessories",
    path: "/root/phonetab/accessories",
    desc: "accessories",
    icon: "/images/ptaccessories.png",
    children: [backupbatteryS._id, cablechargerS._id, ptbatteryS._id, ptsimS._id]

  })
  const ptaccessoriesS = await ptaccessories.save()

  //SCREEN PROTECTOR
  const screenprotector = new Category({
    name: "Screen Protector",
    path: "/root/phonetab/screenprotector",
    desc: "screenprotector",
    icon: "/images/screenprotector.png"

  })
  const screenprotectorS = await screenprotector.save()

  //CASES
  const casecover = new Category({
    name: "Case/Cover",
    path: "/root/phonetab/casecover",
    desc: "case/cover",
    icon: "/images/casecover.png"

  })
  const casecoverS = await casecover.save()
  
  //TABLET

  const tabletother = new Category({
    name: "Others",
    path: "/root/phonetab/tablet/other",
    desc: "others",
    icon: "/images/tabletother.png"

  })
  const tabletotherS = await tabletother.save()

  const tabletkindle = new Category({
    name: "Kindle",
    path: "/root/phonetab/tablet/kindle",
    desc: "kindle",
    icon: "/images/tabletkindle.png"

  })
  const tabletkindleS = await tabletkindle.save()

  const tabletIpad = new Category({
    name: "Ipad",
    path: "/root/phonetab/tablet/ipad",
    desc: "ipad",
    icon: "/images/tabletIpad.png"

  })
  const tabletIpadS = await tabletIpad.save()

  const tablet = new Category({
    name: "Tablets",
    path: "/root/phonetab/tablet",
    desc: "tablet",
    icon: "/images/tablet.png",
    children: [tabletIpadS._id, tabletkindleS._id, tabletotherS._id]

  })
  const tabletS = await tablet.save()

  //PHONE
  const smartphone = new Category({
    name: "Smartphone",
    path: "/root/phonetab/phone/smart",
    desc: "smartphone",
    icon: "/images/smartphone.png"

  })
  const smartphoneS = await smartphone.save()

  const casualphone = new Category({
    name: "Casual Phone",
    path: "/root/phonetab/phone/casual",
    desc: "casualphone",
    icon: "/images/casualphone.png"

  })
  const casualphoneS = await casualphone.save()

  const phone = new Category({
    name: "Phone",
    path: "/root/phonetab/phone",
    desc: "phone",
    icon: "/images/phone.png",
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
    desc: "wearable",
    icon: "/images/wearable.png"
  })
  const wearableS = await wearable.save()

  //TV
  const tv = new Category({
    name: "TV",
    path: "/root/electronic/tv",
    desc: "tv",
    icon: "/images/tv.png"
  })
  const tvS = await tv.save()

  //ACCESSORIES & GAMING
  const accessgaming = new Category({
    name: "Accessories & Gaming",
    path: "/root/electronic/accessgaming",
    desc: "access&gaming",
    icon: "/images/accessgaming.png"
  })
  const accessgamingS = await accessgaming.save()

  //HEADPHONE
  const overear = new Category({
    name: "Over-ear Headphone",
    path: "/root/electronic/audio/overear",
    desc: "over",
    icon: "/images/overear.png"
  })
  const overearS = await overear.save()

  const onear = new Category({
    name: "On-ear Headphone",
    path: "/root/electronic/audio/onear",
    desc: "onear",
    icon: "/images/onear.png"
  })
  const onearS = await onear.save()

  const inear = new Category({
    name: "In-ear Headphone",
    path: "/root/electronic/audio/inear",
    desc: "inear",
    icon: "/images/inear.png"
  })
  const inearS = await inear.save()

  const headphone = new Category({
    name: "Headphone",
    path: "/root/electronic/headphone",
    desc: "headphone",
    icon: "/images/headphone.png",
    children: [inearS._id, onearS._id, overearS._id]

  })
  const headphoneS = await headphone.save()

  //AUDIO
  const karaoke = new Category({
    name: "Karaoke",
    path: "/root/electronic/audio/karaoke",
    desc: "karaoke",
    icon: "/images/karaoke.png"
  })
  const karaokeS = await karaoke.save()

  const mediaplayer = new Category({
    name: "Media Player",
    path: "/root/electronic/audio/mediaplayer",
    desc: "mediaplayer",
    icon: "/images/mediaplayer.png"
  })
  const mediaplayerS = await mediaplayer.save()

  const speaker = new Category({
    name: "Speaker",
    path: "/root/electronic/audio/speaker",
    desc: "speaker",
    icon: "/images/speaker.png"
  })
  const speakerS = await speaker.save()

  const audio = new Category({
    name: "Audio",
    path: "/root/electronic/audio",
    desc: "audio",
    icon: "/images/audio.png",
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
    desc: "shamshow",
    icon: "/images/shamshow.png"

  })
  const shamshowS = await shamshow.save()

  //MEN'S COSMETICS
  const beardcare = new Category({
    name: "Beard Care",
    path: "/root/beauty/menscos/beardcare",
    desc: "beardcare",
    icon: "/images/beardcare.png"

  })
  const beardcareS = await beardcare.save()

  const pomade = new Category({
    name: "Pomade",
    path: "/root/beauty/menscos/pomade",
    desc: "pomade",
    icon: "/images/pomade.png"

  })
  const pomadeS = await pomade.save()

  const bodyspray = new Category({
    name: "Body Spray",
    path: "/root/beauty/menscos/bodyspray",
    desc: "bodyspray",
    icon: "/images/bodyspray.png"

  })
  const bodysprayS = await bodyspray.save()

  const menscos = new Category({
    name: "Men's Cosmetic",
    path: "/root/beauty/menscos",
    desc: "menscos",
    icon: "/images/menscos.png",
    children: [bodysprayS._id, pomadeS._id, beardcareS._id]

  })
  const menscosS = await menscos.save()

  //MAKEUP
  const eyemakeup = new Category({
    name: "Eyes Makeup",
    path: "/root/beauty/makeup/eye",
    desc: "eyemakeup",
    icon: "/images/eyemakeup.png"

  })
  const eyemakeupS = await eyemakeup.save()

  const skinmakeup = new Category({
    name: "Skin Makeup",
    path: "/root/beauty/makeup/skin",
    desc: "skinmakeup",
    icon: "/images/skinmakeup.png"

  })
  const skinmakeupS = await skinmakeup.save()

  const lipstick = new Category({
    name: "Lipstick",
    path: "/root/beauty/makeup/lipstick",
    desc: "lipstick",
    icon: "/images/lipstick.png"

  })
  const lipstickS = await lipstick.save()

  const makeup = new Category({
    name: "Makeup",
    path: "/root/beauty/makeup",
    desc: "makeup",
    icon: "/images/makeup.png",
    children: [lipstickS._id, skinmakeupS._id, eyemakeupS._id]

  })
  const makeupS = await makeup.save()

  //SKIN CARE
  const serum = new Category({
    name: "Serum",
    path: "/root/beauty/skincare/serum",
    desc: "serum",
    icon: "/images/serum.png"

  })
  const serumS = await serum.save()

  const lotion = new Category({
    name: "Lotion",
    path: "/root/beauty/skincare/lotion",
    desc: "lotion",
    icon: "/images/lotion.png"

  })
  const lotionS = await lotion.save()

  const mineralspray = new Category({
    name: "Mineral Spray",
    path: "/root/beauty/skincare/mineralspray",
    desc: "mineralspray",
    icon: "/images/mineralspray.png"

  })
  const mineralsprayS = await mineralspray.save()

  const mask = new Category({
    name: "Mask",
    path: "/root/beauty/skincare/mask",
    desc: "mask",
    icon: "/images/mask.png"

  })
  const maskS = await mask.save()

  const sunscreen = new Category({
    name: "Sunscress",
    path: "/root/beauty/skincare/sunscreen",
    desc: "sunscreen",
    icon: "/images/sunscreen.png"

  })
  const sunscreenS = await sunscreen.save()

  const cleanser = new Category({
    name: "Cleanser",
    path: "/root/beauty/skincare/cleanser",
    desc: "cleanser",
    icon: "/images/cleanser.png"

  })
  const cleanserS = await cleanser.save()

  const skincare = new Category({
    name: "Skin Care",
    path: "/root/beauty/skincare",
    desc: "skincare",
    icon: "/images/skincare.png",
    children: [cleanserS._id, sunscreenS._id, maskS._id, lotionS._id, serumS._id, mineralsprayS._id]

  })
  const skincareS = await skincare.save()

  //PERFUME
  const perfume = new Category({
    name: "Perfume",
    path: "/root/beauty/perfume",
    desc: "perfume",
    icon: "/images/perfume.png"

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
    desc: "medicine",
    icon: "/images/medicine.png"

  })
  const medicineS = await medicine.save()

  const dietary = new Category({
    name: "Dietary Supplement",
    path: "/root/health/dietary",
    desc: "dietary supplement",
    icon: "/images/dietary.png"

  })
  const dietaryS = await dietary.save()

  const vitamin = new Category({
    name: "Vitamin",
    path: "/root/health/vitamin",
    desc: "vitamin",
    icon: "/images/vitamin.png"

  })
  const vitaminS = await vitamin.save()

  const medicaleq = new Category({
    name: "Medical Equipment",
    path: "/root/health/medicaleq",
    desc: "medical equipment",
    icon: "/images/medicaleq.png"

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
    desc: "accessories",
    icon: "/images/saccess.png"

  })
  const saccessS = await saccess.save()

  const heelclog = new Category({
    name: "High Heels/Clogs",
    path: "/root/footwear/heelclog",
    desc: "highheels/clogs",
    icon: "/images/heelclog.png"

  })
  const heelclogS = await heelclog.save()

  const westernshoes = new Category({
    name: "Western Shoes",
    path: "/root/footwear/western",
    desc: "westernshoes",
    icon: "/images/westernshoes.png"

  })
  const westernshoesS = await westernshoes.save()

  const slipper = new Category({
    name: "Slipper",
    path: "/root/footwear/slipper",
    desc: "slipper",
    icon: "/images/slipper.png"

  })
  const slipperS = await slipper.save()

  const sneaker = new Category({
    name: "Sneaker",
    path: "/root/footwear/sneaker",
    desc: "sneaker",
    icon: "/images/sneaker.png"

  })
  const sneakerS = await sneaker.save()


  const boots = new Category({
    name: "Boots",
    path: "/root/footwear/boots",
    desc: "boots",
    icon: "/images/boots.png"

  })
  const bootsS = await boots.save()


  const sandal = new Category({
    name: "Sandal",
    path: "/root/footwear/sandal",
    desc: "sandal",
    icon: "/images/sandal.png"

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
    desc: "kitchen hood",
    icon: "/images/khood.png"
  })
  const khoodS = await khood.save()

  const freezer = new Category({
    name: "Freezer",
    path: "/root/houseapp/lequip/freezer",
    desc: "freezer",
    icon: "/images/freezer.png"
  })
  const freezerS = await freezer.save()

  const wapu = new Category({
    name: "Water Purifier",
    path: "/root/houseapp/lequip/wapu",
    desc: "water purifier",
    icon: "/images/wapu.png"
  })
  const wapuS = await wapu.save()

  const refrige = new Category({
    name: "Refrigerator",
    path: "/root/houseapp/lequip/refrige",
    desc: "refrigerator",
    icon: "/images/refrige.png"
  })
  const refrigeS = await refrige.save()

  const washdry = new Category({
    name: "Washing % Drying Machine",
    path: "/root/houseapp/lequip/washdry",
    desc: "washing/drying machine",
    icon: "/images/washdry.png"
  })
  const washdryS = await washdry.save()

  const lequip = new Category({
    name: "Large Equiment",
    path: "/root/houseapp/lequip",
    desc: "large equipment",
    icon: "/images/lequip.png",
    children: [washdryS._id, refrigeS._id, wapuS._id, freezerS._id, khoodS._id]
  })
  const lequipS = await lequip.save()

  //CLEANING
  const dust = new Category({
    name: "Dust Blower",
    path: "/root/houseapp/clean/dust",
    desc: "dustblower",
    icon: "/images/dust.png"
  })
  const dustS = await dust.save()

  const vacuum = new Category({
    name: "Vacuum Cleaner",
    path: "/root/houseapp/clean/vacuum",
    desc: "vacuum",
    icon: "/images/vacuum.png"
  })
  const vacuumS = await vacuum.save()

  const cleaning = new Category({
    name: "Cleaning Equiment",
    path: "/root/houseapp/clean",
    desc: "cleaning",
    icon: "/images/cleaning.png",
    children: [vacuumS._id, dustS._id]
  })
  const cleaningS = await cleaning.save()

  //CLOTHING CARE
  const sewing = new Category({
    name: "Sewing Machine",
    path: "/root/houseapp/clothcare/sewing",
    desc: "sewing",
    icon: "/images/sewing.png"
  })
  const sewingS = await sewing.save()

  const iron = new Category({
    name: "Iron",
    path: "/root/houseapp/clothcare/iron",
    desc: "iron",
    icon: "/images/iron.png"
  })
  const ironS = await iron.save()

  const clothcare = new Category({
    name: "Clothing Care",
    path: "/root/houseapp/clothcare",
    desc: "clothingcare",
    icon: "/images/clothcare.png",
    children: [ironS._id, sewingS._id]
  })
  const clothcareS = await clothcare.save()

  //FAN & AIR CONDITIONER

  const dehumid = new Category({
    name: "Deumidifier",
    path: "/root/houseapp/fanair/dehumid",
    desc: "dehumidifier",
    icon: "/images/dehumid.png"
  })
  const dehumidS = await dehumid.save()

  const heater = new Category({
    name: "Heater",
    path: "/root/houseapp/fanair/heater",
    desc: "heater",
    icon: "/images/heater.png"
  })
  const heaterS = await heater.save()

  const waterheat = new Category({
    name: "Electric Water Heater",
    path: "/root/houseapp/fanair/waterheat",
    desc: "electric water heater",
    icon: "/images/waterheat.png"
  })
  const waterheatS = await waterheat.save()

  const humid = new Category({
    name: "Humidifier",
    path: "/root/houseapp/fanair/humid",
    desc: "humidifier",
    icon: "/images/humid.png"
  })
  const humidS = await humid.save()

  const aircon = new Category({
    name: "Air-conditioner",
    path: "/root/houseapp/fanair/aircon",
    desc: "aircon",
    icon: "/images/aircon.png"
  })
  const airconS = await aircon.save()

  const fan = new Category({
    name: "Fan",
    path: "/root/houseapp/fanair/fan",
    desc: "fan",
    icon: "/images/fan.png"
  })
  const fanS = await fan.save()

  const fanair = new Category({
    name: "Fan & Air-conditioner",
    path: "/root/houseapp/fanair",
    desc: "fan/aircon",
    icon: "/images/fanair.png",
    children: [fanS._id, airconS._id, humidS._id, waterheatS._id, heaterS._id, dehumidS._id]
  })
  const fanairS = await fanair.save()

  //KITCHEN
  const fryer = new Category({
    name: "Fryer",
    path: "/root/houseapp/kitchen/fryer",
    desc: "fryer",
    icon: "/images/fyer.png"
  })
  const fryerS = await fryer.save()

  const panpot = new Category({
    name: "Pan & Pot",
    path: "/root/houseapp/kitchen/panpot",
    desc: "pan/pot",
    icon: "/images/panpot.png"
  })
  const panpotS = await panpot.save()

  const ovenmicro = new Category({
    name: "Oven & Microwave",
    path: "/root/houseapp/kitchen/ovenmicro",
    desc: "oven/microwave",
    icon: "/images/ovenmicro.png"
  })
  const ovenmicroS = await ovenmicro.save()

  const baking = new Category({
    name: "Baking",
    path: "/root/houseapp/kitchen/baking",
    desc: "baking",
    icon: "/images/baking.png"
  })
  const bakingS = await baking.save()

  const stove = new Category({
    name: "Stove",
    path: "/root/houseapp/kitchen/stove",
    desc: "stove",
    icon: "/images/stove.png"
  })
  const stoveS = await stove.save()

  const cooker = new Category({
    name: "Cooker",
    path: "/root/houseapp/kitchen/cooker",
    desc: "cooker",
    icon: "/images/cooker.png"
  })
  const cookerS = await cooker.save()

  const fprocessor = new Category({
    name: "Food Processor",
    path: "/root/houseapp/kitchen/fprocessor",
    desc: "foodprocessor",
    icon: "/images/fprocessor.png"
  })
  const fprocessorS = await fprocessor.save()

  const kitchen = new Category({
    name: "Kitchen",
    path: "/root/houseapp/kitchen",
    desc: "kitchen",
    icon: "/images/kitchen.png",
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
    desc: "vbook",
    icon: "/images/vbook.png"

  })
  const vbookS = await vbook.save()

  const fbook = new Category({
    name: "Foreign Book",
    path: "/root/bookedu/fbook",
    desc: "fbook",
    icon: "/images/fbook.png"
  })
  const fbookS = await fbook.save()

  const stationery = new Category({
    name: "Stationery",
    path: "/root/bookedu/stationery",
    desc: "stationery",
    icon: "/images/stationery.png"
  })
  const stationeryS = await stationery.save()

  const instrument = new Category({
    name: "Instrument",
    path: "/root/bookedu/instrument",
    desc: "instrument",
    icon: "/images/instrument.png"
  })
  const instrumentS = await instrument.save()

  const souvenir = new Category({
    name: "Souvenir",
    path: "/root/bookedu/souvenir",
    desc: "souvenir",
    icon: "/images/souvenir.png"
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
    desc: "milk",
    icon: "/images/milk.png"
  })
  const milkS = await milk.save()

  const gift = new Category({
    name: "Gift",
    path: "/root/fooddrink/gift",
    desc: "gift",
    icon: "/images/gift.png"
  })
  const giftS = await gift.save()

  const beverage = new Category({
    name: "Beverage",
    path: "/root/fooddrink/beverage",
    desc: "beverage",
    icon: "/images/beverage.png"
  })
  const beverageS = await beverage.save()

  const cannedpackage = new Category({
    name: "Canned/Package Food",
    path: "/root/fooddrink/canpack",
    desc: "can/package",
    icon: "/images/cannedpackage.png"
  })
  const cannedpackageS = await cannedpackage.save()

  const drink = new Category({
    name: "Drink",
    path: "/root/fooddrink/drink",
    desc: "drink",
    icon: "/images/drink.png"

  })
  const drinkS = await drink.save()
  
  const snack = new Category({
    name: "Snack",
    path: "/root/fooddrink/snack",
    desc: "snack",
    icon: "/images/snack.png"
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
