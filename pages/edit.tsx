import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Account from "../components/Account";
import CustomKnob from "../components/CustomKnob";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import { CONTRACT_ABI } from "../contracts/ABI";
import useContract from "../hooks/useContract";
import useEagerConnect from "../hooks/useEagerConnect";
import { APP_CHAIN_ID, CONTRACT_ADDRESS } from "../util";
import ReactFullpage from '@fullpage/react-fullpage';
import { Donut } from 'react-dial-knob'
import Navbar from "../components/Menu";




function Edit() {
  const { account, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [activeParams, setParamActive] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  })
  const [params, setParams] = useState(null)
  const [section, setSection] = useState(null)
  const knobs = [0, 1, 2, 3, 4, 5, 6, 7]

  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI)

  useEffect(() => {

    connectMetamask()

  }, [isConnected, contract])

  const connectMetamask= () => {
    if (contract && isConnected) {
      if (!params) {
        try {
          contract.getAllParamStruct().then(res => {
            const parsed = []
            for (let index = 0; index < 8; index++) {
              parsed.push({
                value: parseInt(res[index].value),
                maxVal: parseInt(res[index].maxVal),
                minVal: parseInt(res[index].minVal)
              })
            }
            setParams(parsed)
            console.log(parsed);
          }).catch(e => console.log(e))
          contract._section().then(res => {
            setSection(res)
          }).catch(e => console.log(e))
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (!isConnected) {
      // @ts-ignore
      window?.ethereum?.enable()
    }

    if (chainId && chainId !== APP_CHAIN_ID) {
      switchChain()
    }
  }

  const save = async () => {

    /*
    struct ParamChange {
        uint id;
        uint value;
    }
    */

    let payload = []
    for (let index = 0; index < 8; index++) {
      if (activeParams[index]) {
        payload.push({
          id: index,
          value: parseInt(params[index].value)
        });
      }
    }

    const tx = await contract.changeParameterMulti(payload)
    await tx.wait(2)
    setParamActive({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false
    })
  }

  return <div className="main">
    <Navbar rightChain={chainId == APP_CHAIN_ID} isConnected={isConnected} connect={connectMetamask} />
    {
      !isConnected && <div className="center">
        <button onClick={() => {
          // @ts-ignore
          window.ethereum?.enable()?.then(() => location.reload())
        }} className="toggle mt-5">
          SIGN IN WITH METAMASK
        </button>
      </div>
    }
    {
      (chainId && chainId !== APP_CHAIN_ID) && <div className="center">
        <button onClick={() => {
          // @ts-ignore
          switchChain()
        }} className="toggle mt-5">
          CONNECT TO AVALANCHE C-CHAIN
        </button>
      </div>
    }

    {params && (
      <div><div className="knobs-grid">
        {
          knobs?.map(knob => <div key={knob} className="knob-">
            <Donut
              diameter={100}
              value={params[knob]?.value}
              max={parseInt(params[knob]?.maxVal)}
              min={parseInt(params[knob]?.minVal)}
              step={1}
              theme={{
                donutColor: activeParams[knob] ? "#1ac92c" : "grey",
                donutThickness: 15,
              }}
              onValueChange={(e) => {
                if (!activeParams[knob]) return
                setParams(prev => {
                  console.log(prev);
                  const newParams = Object.assign({}, prev)
                  newParams[knob].value = e
                  return newParams
                })
              }}
              ariaLabelledBy={knob?.toFixed()}
            >
            </Donut>
            <button onClick={() => {
              if (!activeParams[knob]) {
                let totalEnabled = 0;
                for (let index = 0; index < 7; index++) {
                  if (activeParams[index]) totalEnabled++;
                }
                if (totalEnabled >= parseInt(section.numParams)) {
                  console.log("Max. params reached.");
                  return
                }
              }

              setParamActive(prev => {
                const newParams = Object.assign({}, prev)
                newParams[knob] = !newParams[knob]
                return newParams
              })
            }} className={`${activeParams[knob] ? `toggle` : `toggle inactive`}`}>
              Toggle
            </button>
          </div>)
        }
      </div>
        <div className="center">
          <button onClick={save} className="toggle mt-5">
            SAVE NEW PARAMETERS
          </button>
        </div>
      </div>
    )}
  </div>
}

export default Edit;
function switchChain() {
  throw new Error("Function not implemented.");
}

