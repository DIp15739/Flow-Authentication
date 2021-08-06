import {atomFamily, useRecoilState} from "recoil"
import {isInitialized} from "../flow/is-initialized.script"
import {initAccount} from "../flow/init-account.tx"

const IDLE = "IDLE"
const PROCESSING = "PROCESSING"

const $profile = atomFamily({
  key: "INIT::PROFILE::STATE",
  default: null,
})

const $profileStatus = atomFamily({
  key: "INIT::PROFILE::STATUS",
  default: PROCESSING,
})

export function useInit(address) {
  const [profile, setProfile] = useRecoilState($profile(address))
  const [status, setStatus] = useRecoilState($profileStatus(address))

  // check if the supplied address is initialized
  async function check() {
    setStatus(PROCESSING)

    if (address != null) await isInitialized(address).then(setProfile)
    setStatus(IDLE)
  }

  // attempt to initialize the current address
  async function exec() {
    setStatus(PROCESSING)
    await initAccount()
    setStatus(IDLE)
    await check()
  }

  return {
    profile,
    check,
    exec,
    isIdle: status === IDLE,
    isProcessing: status === PROCESSING,
    status,
    IDLE,
    PROCESSING,
  }
}