import { useWeb3React } from "@web3-react/core"
import Link from "next/link"
import Navbar from "../components/Menu"
import useEagerConnect from "../hooks/useEagerConnect";
import { APP_CHAIN_ID, switchChain } from "../util";

export default function HomePage() {
    const triedToEagerConnect = useEagerConnect();
    const { account, library, chainId } = useWeb3React();

    const isConnected = typeof account === "string" && !!library;
    const connect = () => {
        if (!isConnected) {
            console.log('login.');
            // @ts-ignore
            window?.ethereum?.enable()
        }
        if (chainId && chainId !== APP_CHAIN_ID) {
            switchChain()
        }
    }

    return <>
        <Navbar rightChain={chainId && chainId == APP_CHAIN_ID} isConnected={isConnected} connect={connect} />
        <div className="container">
            <div className="home">
                <h1>
                    Concept
                </h1>
                <p>
                    Smart contract controlled internet of things and sounds and images and light and voltage and bits and bytes; to be used in time based interactive compositions, permanent installations, spatial design, game mechanics, live performances, having an immutable permanent record of events.
                </p>
                <p>
                    A smart contract holds “n” amount of parameters which has a min/max integer range.
                </p>
                <p>
                    <strong>
                        Example:
                    </strong>
                </p>
                <p className="code">
                    {`
                    struct Param { 
                        uint id;
                        uint minVal;
                        uint maxVal;
                        address lastAddress;
                        uint lastChange;
                        uint value;
               }`}
                </p>
                <p>
                    During the performance/installation, wallets can connect to this website and edit any parameters they want.

                    A python script reads the necessary parameters and variables in real time and converts them to “Open Sound Control” messages. Messages are broadcasted to every computer in the local network.
                </p>
                <p className="code">
                    {`
                    /time 329754
                    `}
                </p>

                <p className="code">
                    {`
                    /param [2, 479, '0x5A135de1dB9A1eDc434e661c510B51FC199Fc728', 27033]
                    `}
                </p>

                <p className="code">
                    {`
                    /section [1, 1638124971, 8, '0xFaDdfE36a6677768A5bF8b3593253D2D38b7C702']
                    `}
                </p>
                <p>
                    Any software that can read OSC can parse the incoming data and control anything. Lights in a room, pitch of sine waves, relay controlled electronics, fog machine, modular synth, ram data of a nes game…
                </p>
                <p>
                    Interaction of users can be gamified in various ways and use an erc20 token as a utility currency.
                </p>
            </div>
            <div id="#about" className="about">
                <h1>
                    Use case
                </h1>
                <p>
                    Music for smart contract controlled electronics + visuals and instruments
                    Duration: 20-30 minutes
                    <br />

                    8 parameters in contract.
                    <br />
                    <br />
                    Supercollider reads the data for generating sounds / musical phrases - touchdesigner generate real time visuals. Instruments play alongside.
                    <br />
                    <br />
                    There is a section counter in the smart contract, and every 3 minutes it can be changed by a wallet. While this user changes the section, they can determine how many parameters a wallet can edit at once.                </p>
            </div>
            <div id="#team" className="team">
                <h1>
                    TEAM
                </h1>
                <ul className="team-members">
                    <li>
                        <img src="https://ipfs.infura.io/ipfs/QmPfXnN7gneZu5eVRcZgwMpmfo2XZhQnzWWbpVsAGktG1x" alt="" />
                        <div>
                            BERK ÖZDEMİR
                        </div>
                    </li>
                    <li>
                        <img src="https://ipfs.infura.io/ipfs/QmPfXnN7gneZu5eVRcZgwMpmfo2XZhQnzWWbpVsAGktG1x" alt="" />
                        <div>
                            CANER SEVİNCE
                        </div>
                    </li>
                    <li>
                        <img src="https://ipfs.infura.io/ipfs/QmPfXnN7gneZu5eVRcZgwMpmfo2XZhQnzWWbpVsAGktG1x" alt="" />
                        <div>
                            İBRAHİM SEFA TUNA
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </>
}
