(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[129],{8627:function(e,r,a){Promise.resolve().then(a.bind(a,829))},148:function(e,r,a){"use strict";a.d(r,{DM:function(){return h},F7:function(){return x},Mo:function(){return u},Ms:function(){return m},Vy:function(){return c},cL:function(){return i},n2:function(){return p},sp:function(){return f},v$:function(){return d}});var t=a(5236),s=a(5735),o=a(9842);(0,t.C6)().length||(0,t.ZF)({apiKey:"AIzaSyC0asw5YPc1NtfiwOWPDs6DSJzSu4v2rag",authDomain:"quiz-app-e5a9c.firebaseapp.com",projectId:"quiz-app-e5a9c",storageBucket:"quiz-app-e5a9c.appspot.com",messagingSenderId:"1052981741207",appId:"1:1052981741207:web:659750b96c46cdd7b94bd2"});let n=(0,s.v0)(),l=(0,o.ad)(),c=()=>n,u=async(e,r,a)=>{let t=(0,o.IO)((0,o.hJ)(l,"users"),(0,o.ar)("username","==",a));if(!(await (0,o.PL)(t)).empty){let e=Error("Username already exists");throw e.code="auth/username-already-in-use",e}let c=(await (0,s.Xb)(n,e,r)).user.uid;await (0,o.pl)((0,o.JU)(l,"users",c),{username:a})},i=async(e,r)=>{await (0,s.e5)(n,e,r)},d=e=>{switch(e){case"auth/user-not-found":return"Email not registered";case"auth/wrong-password":return"Wrong password";default:return"Incorrect email or password"}},p=e=>{switch(e){case"auth/email-already-in-use":return"Email has been registered";case"auth/username-already-in-use":return"Username already exists";default:return"An error occurred during the sign up process"}},m=async e=>{try{let r=(0,o.JU)(l,"users",e),a=await (0,o.QT)(r);if(a.exists())return a.data().username;return console.log("No such document!"),null}catch(e){return console.error("Error getting document:",e),null}},f=async(e,r,a)=>{try{await (0,o.pl)((0,o.JU)(l,"users",e),{correct:r,incorrect:a,score:20*r},{merge:!0})}catch(e){console.error("Error saving score to Firestore:",e)}},x=async e=>{try{let r=(0,o.JU)(l,"users",e),a=await (0,o.QT)(r);if(!a.exists())return console.log("No such document!"),null;{let e=a.data();return{correct:e.correct,incorrect:e.incorrect,score:e.score}}}catch(e){return console.error("Error getting document:",e),null}},h=async()=>{try{let e=[];return(await (0,o.PL)((0,o.hJ)(l,"users"))).forEach(r=>{let a=r.data(),t={userId:r.id,username:a.username,score:a.score};e.push(t)}),e}catch(e){return console.error("Error getting scores:",e),null}}},829:function(e,r,a){"use strict";a.r(r);var t=a(7437),s=a(2265),o=a(7138),n=a(148),l=a(6463),c=a(9343),u=a(9934),i=a(4820),d=a(239),p=a(4769),m=a(468);r.default=()=>{let{register:e,handleSubmit:r,watch:a,formState:{errors:f}}=(0,c.cI)(),[x,h]=(0,s.useState)(null),[g,y]=(0,s.useState)(!1),[b,w]=(0,s.useState)(!1),[j,N]=(0,s.useState)(!1),[v,k]=(0,s.useState)(!1),C=(0,l.useRouter)(),P=async e=>{h(null),y(!1);try{k(!0),await (0,n.Mo)(e.email,e.password,e.username),k(!1),C.push("/")}catch(e){k(!1),h((0,n.n2)(e.code)),y(!0)}},q=(e,r)=>{"clickaway"!==r&&y(!1)};return(0,t.jsx)("div",{className:"bg-secondary min-h-screen px-6 py-6 md:flex md:items-center md:justify-center",children:(0,t.jsxs)("div",{className:"bg-light rounded-3xl mx-auto p-3 shadow-2xl max-w-md md:w-full",children:[(0,t.jsx)("h1",{className:"px-3 text-gray-900 font-bold mb-1 text-lg",children:"Create Account"}),(0,t.jsxs)("form",{onSubmit:r(P),className:"max-w-md mx-auto p-3",children:[(0,t.jsxs)("div",{className:"relative z-0 w-full mb-5 group",children:[(0,t.jsx)("input",{type:"text",id:"floating_username",...e("username",{required:"Username is required",minLength:{value:6,message:"Minimum length of 6 characters"}}),className:"border ".concat(f.username?"border-red-500":"border-gray-300"," block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"),placeholder:" ",autoComplete:"username",required:!0}),f.username&&(0,t.jsx)("p",{className:"text-red-500 text-sm",children:f.username.message}),(0,t.jsx)("label",{htmlFor:"floating_username",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Username"})]}),(0,t.jsxs)("div",{className:"relative z-0 w-full mb-5 group",children:[(0,t.jsx)("input",{type:"email",id:"floating_email",...e("email",{required:"Email is required"}),className:"border ".concat(f.email?"border-red-500":"border-gray-300"," block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"),placeholder:" ",autoComplete:"email",required:!0}),f.email&&(0,t.jsx)("p",{className:"text-red-500 text-sm",children:f.email.message}),(0,t.jsx)("label",{htmlFor:"floating_email",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Email"})]}),(0,t.jsxs)("div",{className:"relative z-0 w-full mb-5 group",children:[(0,t.jsx)("input",{type:b?"text":"password",id:"floating_password",...e("password",{required:"Password is required",minLength:{value:6,message:"Minimum length of 6 characters"}}),className:"border ".concat(f.password?"border-red-500":"border-gray-300"," block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"),placeholder:" ",autoComplete:"new-password",required:!0}),(0,t.jsx)("span",{className:"absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",onClick:()=>{w(e=>!e)},children:b?(0,t.jsx)(d.Z,{className:"text-gray-300"}):(0,t.jsx)(p.Z,{className:"text-gray-300"})}),f.password&&(0,t.jsx)("p",{className:"text-red-500 text-sm",children:f.password.message}),(0,t.jsx)("label",{htmlFor:"floating_password",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Password"})]}),(0,t.jsxs)("div",{className:"relative z-0 w-full mb-5 group",children:[(0,t.jsx)("input",{type:j?"text":"password",id:"floating_confPassword",...e("confPassword",{required:"Confirm Password is required",validate:e=>e===a("password")||"Passwords do not match"}),className:"border ".concat(f.confPassword?"border-red-500":"border-gray-300"," block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"),placeholder:" ",autoComplete:"new-password",required:!0}),(0,t.jsx)("span",{className:"absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",onClick:()=>{N(e=>!e)},children:j?(0,t.jsx)(d.Z,{className:"text-gray-300"}):(0,t.jsx)(p.Z,{className:"text-gray-300"})}),f.confPassword&&(0,t.jsx)("p",{className:"text-red-500 text-sm",children:f.confPassword.message}),(0,t.jsx)("label",{htmlFor:"floating_confPassword",className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Confirm Password"})]}),(0,t.jsx)("button",{type:"submit",className:"w-full relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-primary",children:v?(0,t.jsx)("span",{className:"w-full relative px-5 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 ",children:(0,t.jsx)(m.Z,{size:"1rem",style:{color:"white"}})}):(0,t.jsx)("span",{className:"w-full relative px-5 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 ",children:"Create Account"})})]}),(0,t.jsxs)("p",{className:"flex items-center max-w-md mx-auto text-xs px-3 mb-3 text-gray-900",children:["Already have an account?"," ",(0,t.jsx)(o.default,{href:"/signin",className:"text-primary hover:underline block px-1",children:"Sign in"})]}),(0,t.jsx)(u.Z,{open:g,autoHideDuration:6e3,onClose:q,children:(0,t.jsx)(i.Z,{onClose:q,severity:"error",variant:"filled",sx:{width:"100%"},children:x})})]})})}}},function(e){e.O(0,[358,54,899,269,138,755,971,23,744],function(){return e(e.s=8627)}),_N_E=e.O()}]);