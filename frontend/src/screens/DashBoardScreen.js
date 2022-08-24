import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ResponsiveContainer ,LineChart,Line,XAxis,YAxis, CartesianGrid, Legend, BarChart, Tooltip, Bar, PieChart, Pie, Cell} from 'recharts';
import { getAllOrderList } from "../actions/orderActions";
import { listProducts } from "../actions/productActions";
import { userGetList } from "../actions/userActions";
import MessageBox from "../components/MessageBox";
export default function DashBoardScreen(props){
  const userSignin = useSelector( (state) => state.userSignin);
  const { userInfo }=userSignin;
  
  let isPaid=0;
  let isNotPaid=0;
  let totalSell=0;
  let isDelivered=0;
  let isNotDeliverd=0;
    const pdata =[
        {
            name:'Python',
            student:12,
            fess:109
        },
        {
            name:'JavaSript',
            student:122,
            fess:189
        },
        {
            name:'NodeJS',
            student:111,
            fess:119
        },
        {
            name:'Java',
            student:112,
            fess:189
        },

        {
            name:'C',
            student:112,
            fess:189
        },

    ];

    const data2 = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

      const dispatch=useDispatch();
      useEffect(()=>{
        dispatch(getAllOrderList());
        dispatch(userGetList());
        dispatch(listProducts());
      },[dispatch]);
      const users =useSelector( state => state.getAllUsers);
      const {userList=[]} =users;
      const orderMineList =useSelector( state => state.getOrderList);
      const {orders=[]} =orderMineList;
      const productList =useSelector((state) => state.productList);
      const { products=[]}=productList;
      

       const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data3 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

orders.map((element) =>{
  if(element.isPaid){
     isPaid++;
     totalSell=totalSell+element.totalPrice;
  }
  else{
    isNotPaid++;
  }

  if(element.isDelivered){
       isDelivered++;
  }
  else{
    isNotDeliverd++;
  }
});
    return(
        <>
        {
          userInfo!=null && !userInfo.isAdmin?
          (
            <>
             <MessageBox variant="danger">Only Admin Can Access This Web Page <Link to="/" className="brand">Go To Home Page</Link></MessageBox>
            </>
          ):
          (
            <>
            <div className="row2">
       <div className="box box1 b1">
           <h1 className="no">TOTAL ORDERS</h1>
           <h2 className="ok">{orders.length}</h2>
       </div>

       <div className="box box2 b2">
           <h1 className="no">TOTAL  SELL</h1>
          <h2 className="ok">₹ {totalSell.toFixed(2)} </h2>
           </div>

           <div className="box box3 b3">
       <h1 className="no">TOTAL  UNPAID PAYMENT</h1>
       <h2 className="ok">{isNotPaid}</h2>
       </div>

       <div className="box box2 b4">
       <h1 className="no">TOTAL PAID PAYMENT</h1>
       <h2 className="ok">{isPaid}</h2>
       </div>

       <div className="box box1 b5">
       <h1 className="no">TOTAL  DELIVERED ITEMS</h1>
       <h2 className="ok">{isDelivered}</h2>
       </div>

       <div className="box box3 b6">
       <h1 className="no">TOTAL  UNDELIVERED ITEMS</h1>
       <h2 className="ok">{isNotDeliverd}</h2>
       </div>
  
       <div className="box box2 b7">
       <h1 className="no">TOTAL  USERS</h1>
       <h2 className="ok">{userList.length}</h2>
       </div>


       <div className="box box1 b8">
       <h1 className="no">TOTAL  PRODUCTS</h1>
       <h2 className="ok">{products.length}</h2>
       </div>


       <div className="box box2 b9">
       <h1 className="no">TOTAL  ADMIN</h1>
       <h2 className="ok">1</h2>
       </div>
       </div>

       
       <div className="row2">


  
<ResponsiveContainer width="50%" height="90%" aspect={2}>
  
       <BarChart
          data={orders}
          margin={{
            top: 20,
           }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="orders.orderItems[i].name" />
          <YAxis dataKey="totalPrice" />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalPrice" fill="#8884d8" />
          <Bar dataKey="taxPrice" fill="#82ca9d" />
        </BarChart>
        </ResponsiveContainer>
</div> 

           </>
          )
        }
  </>
    )
}