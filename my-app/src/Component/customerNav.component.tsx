import { Link, NavLink, Outlet } from "react-router-dom"

const CustomerNav = () => {

    return <>
        <div className={'nav'}>
            <header>
                <nav>
                    <ul>

                        <li className="nav"><Link to={'/dashboard'}>דשבורד</Link></li>
                        <li className="nav"><Link to={'/leads'}>לידים</Link></li>
                        <li className="nav"><Link to={'/customers'}>לקוחות</Link></li>
                        {/* <li className="nav"><Link to={'/staff'}>צוות</Link></li>
                        <li className="nav"><Link to={'/tasks'}>משימות</Link></li> 
                        <li className="nav"><Link to={'/bookkeeping'}>הנה"ח</Link></li> */}
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>

    </>
}
export default CustomerNav
