import { Navigate,useRoutes } from "react-router-dom"
import { LazyLoad } from "@/routes/lazyLoad"

export default function myRoute() {
  const element = useRoutes([
      {path:"/film",element:LazyLoad("Film"),children:[
          {
              path:"",
              element:<Navigate  to="/film/nowplaying"/>
          },
          {
              path:"nowplaying",
              element:LazyLoad("film/Nowplaying")
          },
          {
              path:"comingsoon",
              element:LazyLoad("film/Comingsoon")
          }
      ]},
      {
          path:"/cinema",element:LazyLoad("Cinema")
      },
      {
          path:"/login",element:LazyLoad("Login")
      },
      {
          path:"/center",element:LazyLoad("film/Nowplaying")
      },
      {
          path:"/detail/:id",element:LazyLoad("Detail")
      },
      {
          path:"/",element:<Navigate to="/film"/>
      },
      {
          path:"*",element:LazyLoad("NotFound")
      },
  ])

  return element
}