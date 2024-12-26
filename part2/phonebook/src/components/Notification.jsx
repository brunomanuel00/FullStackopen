export default function Notfication({ notification }) {

    if (notification) {
        const colorType = notification.typeOfMessage === 'success' ? 'green' : 'red';

        const notificationStyle = {
            color: colorType,
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
        return <div style={notificationStyle}> {notification.message}</div>
    } else {
        return null
    }
}