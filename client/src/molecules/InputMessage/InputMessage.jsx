function InputMessage() {
    return (
        <div class="w-100 d-flex justify-content-center">
            <form id="message_area" action="" class="w-75">
                <div class="input-group mb-3">
                    <input id="text_area" autocomplete="off" type="text" class="form-control" placeholder="type a message..."
                        aria-label="type a message..." aria-describedby="basic-addon2" />
                    <div class="input-group-append mx-1">
                        <button class="btn btn-success">Send</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default InputMessage;