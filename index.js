import express from 'express';
import axios from 'axios';
import fetch, { Headers } from 'node-fetch';
const app = express();
const headers = new Headers()
const port = process.env.PORT || 3001
// app.use(express.static('public'));
const pass = `Bodx 6fpL vOXl t21r ymRP YZih`
const user = 'xelopsys'

headers.set('Content-Type', 'application/json')
headers.set('Authorization', 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64'))

// const orders = async () => {
//     await getOrders().then(orders => {
//         console.log(orders[0].line_items)
//     }
//     )
// }
// orders()

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/', async (req, res) => {
    await axios.get('https://mollys.uz/wp-json/wc/v3/orders/', {
        auth: {
            username: user,
            password: pass
        },
    }).then((response) => {
        res.send(response.data)
    }).catch(error => {
        res.send(error)
    })

})



// function getOrder(id) {
//     return fetch(`https://mollys.uz/wp-json/wc/v3/orders/${id}`, {
//         method: 'GET',
//         headers: headers
//     }).then(response => {
//         return response.json()
//     }).catch(error => {
//         console.log(error)
//     })
// }

// function sendOrdersToTelegram(orders) {
//     orders.forEach(order => {
//         axios.post('https://api.telegram.org/bot1075153074:AAH4-5yV7R-jK9XVzG8f6Z-x6xl-dK_F6_Y/sendMessage', {
//             chat_id: -1001459372488,
//             text: `Заказ №${order.id} от ${order.date_created} обновлен`,
//             parse_mode: 'HTML'
//         }).then(response => {
//             console.log(response)
//         }).catch(error => {
//             console.log(error)
//         })
//     })
// }
// function sendRecentOrderToTelegram(order) {
//     axios.post('https://api.telegram.org/bot1075153074:AAH4-5yV7R-jK9XVzG8f6Z-x6xl-dK_F6_Y/sendMessage', {
//         chat_id: -1001459372488,
//         text: `Заказ №${order.id} от ${order.date_created} обновлен`,
//         parse_mode: 'HTML'
//     }).then(response => {
//         console.log(response)
//     }).catch(error => {
//         console.log(error)
//     })
// }

// function autoSendRecentOrderToTelegram() {
//     getOrder(1).then(order => {
//         sendRecentOrderToTelegram(order)
//     })
// }



// const arr = order.map(item => item.id)


// function observeArray() {
//     let last = arr[0]
//     let lastIndex = 0
//     array.forEach((item, index) => {
//         if (item !== last) {
//             last = item
//             lastIndex = index
//         }
//     })
//     console.log(lastIndex)
// }

// observeArray()

async function getAddedItems() {
    const order = await axios.get('http://localhost:3001/').then(response => {
        return response.data
    })
    // console.log(order)
    const addedItems = []
    for (let i = 0; i < order.length; i++) {
        if (order[i].status !== 'completed') {
            // console.log(order[i])
            addedItems.push(order[i])
        }

    }
    console.log(addedItems.map(item => item.id))
    // const addedItemsIds = addedItems.filter(item => item.id !== order)
}


getAddedItems()