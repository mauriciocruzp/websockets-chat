import OwnMessage from "../../atoms/OwnMessage/OwnMessage";

function MessagesScreen() {
    return (
        <div className="w-75 d-flex flex-column justify-content-end h-100 px-5">
            <OwnMessage />
        </div>
    );
}

export default MessagesScreen;