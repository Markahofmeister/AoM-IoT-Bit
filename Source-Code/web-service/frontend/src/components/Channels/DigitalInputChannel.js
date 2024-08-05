export default function DigitalInputChannel(props) {
    return (
        <div className="mb-3">
            <div className="rounded pb-2 bg-dark d-flex justify-content-center pt-3">
                <h2>{(parseInt(props.state) === 1) ? "ON" : "OFF"}</h2>
            </div>
        </div>
    )
}