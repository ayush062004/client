import './App.css'
import react from 'react'
import { BrowserRouter as Router, Routes, Route }
  from 'react-router'
import Login from './pages/user/Login';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Session from './pages/Session';
import Registration from './pages/Registration';
import Subject from './pages/Subject';
import Examination from '../src/pages/admin/Examination';
import Question from './pages/Question';
import LoginDashboard from './pages/user/LoginDashboard';
import Myexams from './pages/user/Myexams';
import Myresult from './pages/user/Myresult';
import Getexam from './pages/user/Getexam';
import Message from './pages/user/Message';
import Changepassword from './pages/user/Changepassword';

import Examinee from './pages/admin/Examinee';
import ReportGeneration from './pages/admin/ReportGeneration';
import AdminChangepassword from './pages/admin/AdminChangepassword';
import MessageReply from './pages/admin/MessageReply';
import DashboaredHome from './pages/user/DashboaredHome';
import AdminHome from './pages/admin/AdminHome';
import Home from './pages/Home';



function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/AdminLogin' element={<AdminLogin />}></Route>
          <Route path='/AdminDashboard' element={<AdminDashboard />}>
            <Route index element={<AdminHome />}></Route>
            <Route path='session' element={<Session />}></Route>
            <Route path='Subject' element={<Subject />}></Route>
            <Route path='examinee' element={<Examinee />}></Route>
            <Route path='reportgeneration' element={<ReportGeneration />}></Route>
            <Route path='Examination' element={<Examination />}></Route>
            <Route path='Question' element={<Question />}></Route>
            <Route path='adminchangepassword' element={<AdminChangepassword />}></Route>
            <Route path='MessageReply' element={<MessageReply />}></Route>
          </Route>
          <Route path='/Registration' element={<Registration />}></Route>
          <Route path='/LoginDashboard' element={<LoginDashboard />}>
            <Route index element={<DashboaredHome />}></Route>
            <Route path='Myexams' element={<Myexams />}></Route>
            <Route path='Myresult' element={<Myresult />}></Route>
            <Route path='getexam/:id' element={<Getexam />} ></Route>
            <Route path='message' element={<Message />}></Route>
            <Route path='changepassword' element={<Changepassword />}></Route>
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
