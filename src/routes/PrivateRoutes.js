import { Outlet } from 'react-router-dom';

const PrivateRoutes = (props) => {
    return (
        props.isValidInput ? <Outlet/> : alert("Input error")
    )

}

export default PrivateRoutes;