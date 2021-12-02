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
                    Lorem, ipsum dolor.
                </h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam labore voluptatum eum quasi! Dolorum aperiam excepturi ducimus assumenda voluptatum praesentium quasi, amet fugiat suscipit neque exercitationem modi fugit earum odit ratione? Voluptate sunt fuga voluptates possimus doloribus rem iusto nemo quia, recusandae eveniet commodi esse vitae omnis animi doloremque officiis repudiandae qui illum nihil. Vero, facilis eius facere nam error excepturi saepe modi mollitia similique labore quibusdam incidunt ex ab explicabo accusantium rem animi sunt distinctio quia voluptate ipsam dolorum beatae, natus repudiandae. Ad porro quibusdam odit assumenda est iste, placeat, animi libero repudiandae sunt, quod possimus dignissimos in ut?
                </p>
            </div>
            <div id="#about" className="about">
                <h1>
                    Lorem, ipsum dolor sit About.
                </h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam labore voluptatum eum quasi! Dolorum aperiam excepturi ducimus assumenda voluptatum praesentium quasi, amet fugiat suscipit neque exercitationem modi fugit earum odit ratione? Voluptate sunt fuga voluptates possimus doloribus rem iusto nemo quia, recusandae eveniet commodi esse vitae omnis animi doloremque officiis repudiandae qui illum nihil. Vero, facilis eius facere nam error excepturi saepe modi mollitia similique labore quibusdam incidunt ex ab explicabo accusantium rem animi sunt distinctio quia voluptate ipsam dolorum beatae, natus repudiandae. Ad porro quibusdam odit assumenda est iste, placeat, animi libero repudiandae sunt, quod possimus dignissimos in ut?
                </p>
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
