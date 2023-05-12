import { Fragment } from 'react';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './Navigation.styles';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import CartIcon from '../../components/Cart-icon/Cart-icon';
import CartDropdown from '../../components/Cart-dropdown/Cart-dropdown';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const dispatch = useDispatch();

    const signOutUser = () => dispatch(signOutStart());

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;