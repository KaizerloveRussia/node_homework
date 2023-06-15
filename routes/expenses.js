const express = require('express')
const db = require('../database.js')
const router = express.Router()
router.get('/', (req, res) => {
  res.status(200).json()
})

//Add an axpense
router.post('/expenses', (req, res) => {
  const { name, amount, date, category } = req.body
  if (!name || !amount || !date) {
    return res.status(400).json({ error: 'Отсутствуют необходимые поля' })
  }
  const spendingItem = {
    name,
    amount,
    date: new Date(date).toISOString(),
    category,
  }
  db.push(spendingItem)
  res.status(200).json(spendingItem)
})

//get all expenses
router.get('/expenses', (req, res) => {
  res.json(db.get())
})

//search using the date
router.post('/expenses/search', (req, res) => {
  const { date } = req.body
  if (!date) {
    return res.status(400).json({ error: 'Не заполнено поле Date' })
  }
  const formattedDate = new Date(date).toDateString()
  const filtered = db
    .get()
    .filter(
      (spendingItem) => spendingItem.date.toDateString() === formattedDate,
    )
  res.json(filtered)
})

//set limits
router.post('/daily-limit', (req, res) => {
  const { limit } = req.body
  if (typeof limit !== 'number' || limit < 0) {
    return res.status(400).json({ error: 'Неверный формат!' })
  }
  db.setLimit(limit)
  res.status(200).json({ message: 'Ежедневный лимит успешно установлен' })
})

//get limits
router.get('/daily-limit', (req, res) => {
  res.json({ limit: db.getLimit() })
})

module.exports = router
