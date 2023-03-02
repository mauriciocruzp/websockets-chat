import InputMessage from "../../molecules/InputMessage/InputMessage";
import MessagesScreen from "../../molecules/MessagesScreen/MessagesScreen";
import UserList from "../../molecules/UsersList/UserList";

function ChatSection() {
    return (
        <div className="h-100 d-flex flex-column">
            <div className="h-75 shadow-sm pb-3 d-flex flex-row">
                <MessagesScreen />
                <UserList />
            </div>
            <div className="h-25 d-flex align-items-center">
                <InputMessage />
            </div>
        </div>
    );
}

export default ChatSection;