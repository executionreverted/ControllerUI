import { slide as Menu } from 'react-burger-menu'
import Link from 'next/link'
import { switchChain } from '../util'
var styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        right: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

export default function Navbar({ rightChain, isConnected, connect }) {
    return <Menu styles={styles} right={true}>
        <div className="nav-links menu-item">
            <Link href="/">
                <a id="home" className="menu-item" href="/">Home</a>
            </Link>
            <a id="about" className="menu-item" href="#about">About</a>
            <Link href="/edit">
                <a id="play" className="menu-item--small" href="">Play</a>
            </Link>
            <a id="team" className="menu-item--small" href="#team">Team</a>

            {!isConnected && <button onClick={(e) => {
                e.preventDefault()
                connect()
            }} id="team" className="login menu-item--small">Connect<img width="24" src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" /></button>
            }

            {!rightChain && <button onClick={(e) => {
                e.preventDefault()
                switchChain()
            }} id="team" className="login menu-item--small">Switch To C-Chain<img width="24" src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" /></button>
            }
        </div>
    </Menu>
}