export default function Escrow({ address, arbiter, beneficiary, value, handleApprove, approved }) {
    return (
        <div className="existing-contract">
            <ul className="fields">
                <li>
                    <div> Contract Address </div>
                    <div> {address} </div>
                </li>
                <li>
                    <div> Arbiter </div>
                    <div> {arbiter} </div>
                </li>
                <li>
                    <div> Beneficiary </div>
                    <div> {beneficiary} </div>
                </li>
                <li>
                    <div> Value </div>
                    <div> {value / 10 ** 18} ETH </div>
                </li>
                {approved ? (
                    <div className="complete">✓ It's been approved!</div>
                ) : (
                    <div
                        className="button"
                        id={address}
                        onClick={(e) => {
                            e.preventDefault()

                            handleApprove()
                        }}
                    >
                        Approve
                    </div>
                )}
            </ul>
        </div>
    )
}
