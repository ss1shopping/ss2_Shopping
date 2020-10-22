const Total = require("../schema/total.schema");
const Users=require("../schema/user.schema")
const calTotalView=(month)=>{
    let total=0;
  month.map((index,key)=>{
      
     total+=index.view
  })
  return total;
}
const calTotalSold=(month)=>{
    let total=0;
  month.map((index,key)=>{
      
     total+=index.sold
  })
  return total;
}
const calTotalIncome=(month)=>{
    let total=0;
  month.map((index,key)=>{
      
     total+=index.totalInCome
  })
  return total;
}
module.exports={
    getAllInformation:async (req,res,next)=>{
        let {
      day,
      month,
      year
  } = req.params
  var currdatetime = new Date();
  console.log(currdatetime);
  day = day ? day : "02";
  month = month ? month : "01"
  year = year ? year : "2020"
  
  let gt = `${year}-${month}-${1}`
  let lt = `${year}-${month}-${30}`
  let gtprev = `${year}-${parseInt(month)-1}-${1}`
  let ltprev = `${year}-${parseInt(month)-1}-${30}`
  
   let TotalView=0;
   let TotalSold=0;
   let TotalIncome=0;
   let TotalPreView=0;
   let TotalPreSold=0;
   let TotalPreIncome=0;
   let TotalUser=0;
   let percentageView=parseFloat(1);
   let percentageIncome=parseFloat(1);
   let percentageSold=parseFloat(1);
   let percentageUser=parseFloat(1);
     const infor=await Total.find({createdAt: {
      $gt: new Date(gt),
      $lt:new Date(lt)
  }
  })
 TotalUser =await Users.find({createdAt: {
    $gt: new Date(gt),
    $lt:new Date(lt)
}}).count()
 const numberUserPrev=await Users.find({createdAt:{
    $gt:new Date(gtprev),
    $lt:new Date(ltprev),
}}).count()
 percentageUser=Math.round(((TotalUser-numberUserPrev)/numberUserPrev)*100*1000)/1000
  if(infor.length===0){
    res.status(400).json({percentageIncome,percentageSold,percentageView,TotalIncome,TotalSold,TotalView,TotalUser,percentageUser})
    return;
  }
  const inforpreMonth=await Total.find({createdAt:{
      $gt:new Date(gtprev),
      $lt:new Date(ltprev),
  }})
  infor.map((index,key)=>{
      TotalIncome+=index.totalInCome;
      TotalSold+=index.sold;
      TotalView+=index.view
  })
  if(inforpreMonth.length==0){
      percentageIncome=100
      percentageSold=100
      percentageView=100
  }else{
    inforpreMonth.map((index,key)=>{
        TotalPreIncome+=index.totalInCome;
        TotalPreSold+=index.sold;
        TotalPreView+=index.view;
    })
   percentageIncome=Math.round(((TotalIncome-TotalPreIncome)/TotalPreIncome)*100*1000)/1000;
   
   percentageSold=Math.round(((TotalSold-TotalPreSold)/TotalPreSold)*100*1000)/1000
   percentageView=Math.round(((TotalView-TotalPreView)/TotalPreView)*100*1000)/1000;
  
  }
  res.json({percentageIncome,percentageSold,percentageView,TotalIncome,TotalSold,TotalView,TotalUser,percentageUser})
  return;
  
    },
    getTotal:async (req,res,next)=>{
        var months = {
            '1' : 'Jan',
            '2' : 'Feb',
            '3' : 'Mar',
            '4' : 'Apr',
            '5' : 'May',
            '6' : 'Jun',
            '7' : 'Jul',
            '8' : 'Aug',
            '9' : 'Sep',
            '10' : 'Oct',
            '11' : 'Nov',
            '12' : 'Dec'
        }
        let date=new Date();
        date=JSON.stringify(date)
        date=date.split("T")[0]
        const year=date.slice(1,5)
        const month=date.slice(6,8)
        const day=date.slice(9,11)
        let gt = `${year}-${month}-${1}`
  let lt = `${year}-${month}-${30}`
  let gt_1 = `${year}-${parseInt(month)-1}-${1}`
  let lt_1 = `${year}-${parseInt(month)-1}-${30}`
  let gt_2 = `${year}-${parseInt(month)-2}-${1}`
  let lt_2 = `${year}-${parseInt(month)-2}-${30}`
  let gt_3 = `${year}-${parseInt(month)-3}-${1}`
  let lt_3 = `${year}-${parseInt(month)-3}-${30}`
 
        const {kind}=req.params;
        console.log(months[parseInt(month)-1]);
        console.log(typeof month,parseInt(month)-1);
        if(kind=="totalUser"){
            const nameMonth1=months[parseInt(month)]
            const month1=await Users.find({createdAt:{$gt:new Date(gt),$lt:new Date(lt)}}).count()
            const nameMonth2=months[parseInt(month)-1] 
          const month2= await Users.find({createdAt:{$gt:new Date(gt_1),$lt:new Date(lt_1)}}).count()
          const nameMonth3=months[parseInt(month)-2] 
          const month3= await Users.find({createdAt:{$gt:new Date(gt_2),$lt:new Date(lt_2)}}).count()
          const nameMonth4=months[parseInt(month)-3] 
          const month4= await Users.find({createdAt:{$gt:new Date(gt_3),$lt:new Date(lt_3)}}).count()
         
          res.status(200).json({totalMonth1:month1,
            totalMonth2:month2,
            totalMonth3:month3,
            totalMonth4:month4,
            nameMonth1,
            nameMonth2,
            nameMonth3,
            nameMonth4})
          return;
        }if(kind=="totalIncome"){
           const month1=await Total.find({createdAt:{$gt:new Date(gt),$lt:new Date(lt)}})
           const nameMonth1=months[parseInt(month)]
             const totalIncomeMonth1=calTotalIncome(month1)
           const month2= await Total.find({createdAt:{$gt:new Date(gt_1),$lt:new Date(lt_1)}})
           const nameMonth2=months[parseInt(month)-1]
           const totalIncomeMonth2=calTotalIncome(month2)
           const month3= await Total.find({createdAt:{$gt:new Date(gt_2),$lt:new Date(lt_2)}})
           const nameMonth3=months[parseInt(month)-2]
           const totalIncomeMonth3=calTotalIncome(month3)
           const month4= await Total.find({createdAt:{$gt:new Date(gt_3),$lt:new Date(lt_3)}})
           const nameMonth4=months[parseInt(month)-3]
           const totalIncomeMonth4=calTotalIncome(month4)
           res.status(200).json({totalMonth1:totalIncomeMonth1,
            totalMonth2:totalIncomeMonth2,
            totalMonth3:totalIncomeMonth3,
            totalMonth4:totalIncomeMonth4,
            nameMonth1,
            nameMonth2,
            nameMonth3,
            nameMonth4})
           return;
        }
        if(kind=="totalView"){
            
            const month1=await Total.find({createdAt:{$gt:new Date(gt),$lt:new Date(lt)}})
            const nameMonth1=months[parseInt(month)]
              const totalIncomeMonth1=calTotalView(month1)
            const month2= await Total.find({createdAt:{$gt:new Date(gt_1),$lt:new Date(lt_1)}})
            const nameMonth2=months[parseInt(month)-1]
            const totalIncomeMonth2=calTotalView(month2)
            const month3= await Total.find({createdAt:{$gt:new Date(gt_2),$lt:new Date(lt_2)}})
            const nameMonth3=months[parseInt(month)-2]
            const totalIncomeMonth3=calTotalView(month3)
            const month4= await Total.find({createdAt:{$gt:new Date(gt_3),$lt:new Date(lt_3)}})
            const nameMonth4=months[parseInt(month)-3]
            const totalIncomeMonth4=calTotalView(month4)
            res.status(200).json({totalMonth1:totalIncomeMonth1,
              totalMonth2:totalIncomeMonth2,
              totalMonth3:totalIncomeMonth3,
              totalMonth4:totalIncomeMonth4,
              nameMonth1,
              nameMonth2,
              nameMonth3,
              nameMonth4})
            return;
         }
         if(kind=="totalSold"){
            const month1=await Total.find({createdAt:{$gt:new Date(gt),$lt:new Date(lt)}})
            const nameMonth1=months[parseInt(month)]
              const totalIncomeMonth1=calTotalSold(month1)
            const month2= await Total.find({createdAt:{$gt:new Date(gt_1),$lt:new Date(lt_1)}})
            const nameMonth2=months[parseInt(month)-1]
            const totalIncomeMonth2=calTotalView(month2)
            const month3= await Total.find({createdAt:{$gt:new Date(gt_2),$lt:new Date(lt_2)}})
            const nameMonth3=months[parseInt(month)-2]
            const totalIncomeMonth3=calTotalView(month3)
            const month4= await Total.find({createdAt:{$gt:new Date(gt_3),$lt:new Date(lt_3)}})
            const nameMonth4=months[parseInt(month)-3]
            const totalIncomeMonth4=calTotalView(month4)
            res.status(200).json({totalMonth1:totalIncomeMonth1,
              totalMonth2:totalIncomeMonth2,
              totalMonth3:totalIncomeMonth3,
              totalMonth4:totalIncomeMonth4,
              nameMonth1,
              nameMonth2,
              nameMonth3,
              nameMonth4})
            return;
         }

         

        
    }

}