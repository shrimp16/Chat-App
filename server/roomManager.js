class RoomManager {

    constructor() {
        this.rooms = {
            room: []
        }
    }

    createRoom(room, roomName, user) {

        if (!this.rooms[roomName]) {

            this.rooms[roomName] = [];
            changeRoom(room, roomName, user);
            user.send('Created room');
            return;

        }

        user.send('Invalid room');
    }

    removeFromRoom(room, user){

        let usersCopy = this.rooms[room];
    
        usersCopy = usersCopy.filter(element => element.id !== user.id);
    
        this.rooms[room] = usersCopy;
    
    }

    changeRoom(room, newRoom, user) {

        if(!this.rooms[newRoom]){
            user.send('Invalid room');
            return;
        }
    
        removeFromRoom(room, user);
    
        rooms[newRoom].push(user);
    
    };
}