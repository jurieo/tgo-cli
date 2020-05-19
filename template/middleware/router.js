// 中间件 middle/ route.js
export default function({ route, redirect }, req) {
  console.log(req.header);
  if (route.fullPath == "/") {
    // redirect('/home');
  }
}
