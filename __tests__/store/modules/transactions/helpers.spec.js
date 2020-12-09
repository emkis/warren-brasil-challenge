import * as Helpers from '@/store/modules/transactions/helpers'

describe('Transaction Page Filters', () => {
  const mockTransactions = [
    {
      id: '5f89f9f2c5d6d53b4de01393',
      title: 'Resgate',
      description: 'excepteur fugiat dolore est laborum',
      status: 'processing',
      amount: 152984.78,
      date: '2020-04-15',
      from: 'Trade',
      to: 'Férias',
    },
    {
      id: '5f89f9f20b995c3317b0e07b',
      title: 'Movimentação interna',
      description: 'deserunt nulla elit velit consequat',
      status: 'processed',
      amount: 23743.69,
      date: '2020-04-10',
      from: 'Aposentadoria',
      to: 'Férias',
    },
    {
      id: '5f89f9f2ad4b73614ac24659',
      title: 'Resgate',
      description: 'cupidatat culpa nostrud cillum mollit',
      status: 'processing',
      amount: 33122.13,
      date: '2020-04-10',
      from: 'Conta Warren',
      to: 'Aposentadoria',
    },
    {
      id: '5f89f9f274adb750cb95c33d',
      title: 'Resgate',
      description: 'sit laborum est ut aute',
      status: 'created',
      amount: 31930.56,
      date: '2020-04-10',
      from: 'Aposentadoria',
      to: 'Férias',
    },
  ]

  describe('parseTransactions()', () => {
    it('should parse the transactions', () => {
      const parsed = Helpers.parseTransactions(mockTransactions)

      expect(parsed).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            status: expect.objectContaining({
              value: expect.any(String),
              formatted: expect.any(String),
            }),
            amount: expect.any(Number),
            date: expect.any(String),
            from: expect.any(String),
            to: expect.any(String),
          }),
        ])
      )
    })
  })

  describe('isFilterMatchThisStatus()', () => {
    const mockTransaction = {
      id: '5f89f9f274adb750cb95c33d',
      title: 'Resgate',
      description: 'sit laborum est ut aute',
      status: {
        value: 'created',
        formatted: 'Criado',
      },
      amount: 31930.56,
      date: '2020-04-10',
      from: 'Aposentadoria',
      to: 'Férias',
    }

    it('should return true if wanted filter match the transaction filter', () => {
      expect(Helpers.isFilterMatchThisStatus(mockTransaction, 'created')).toBe(
        true
      )
    })

    it('should return false if wanted filter do not match the transaction filter', () => {
      expect(Helpers.isFilterMatchThisStatus(mockTransaction, 'arou')).toBe(
        false
      )
    })
  })

  describe('isTitleMatchQuery()', () => {
    const mockTransaction = {
      id: '5f89f9f274adb750cb95c33d',
      title: 'Resgate',
      description: 'sit laborum est ut aute',
      status: {
        value: 'created',
        formatted: 'Criado',
      },
      amount: 31930.56,
      date: '2020-04-10',
      from: 'Aposentadoria',
      to: 'Férias',
    }

    it('should return true if provided title match query', () => {
      expect(Helpers.isTitleMatchQuery(mockTransaction, 'sgat')).toBe(true)
    })

    it('should return false if provided title do not match query', () => {
      expect(Helpers.isTitleMatchQuery(mockTransaction, 'iufdhfiu')).toBe(false)
    })
  })

  describe('filterTransactionsByStatusAndTitle()', () => {})

  describe('groupTransactionsByDate()', () => {
    it('should return an object with grouped transactions by date', () => {
      const grouped = Helpers.groupTransactionsByDate(mockTransactions)

      expect(grouped).toEqual(
        expect.objectContaining({
          '2020-04-10': expect.any(Object),
          '2020-04-15': expect.any(Object),
        })
      )
    })
  })

  describe('sortTransactionsDate()', () => {
    it('should return array of sorted transactions', () => {
      const grouped = Helpers.groupTransactionsByDate(mockTransactions)
      const sorted = Helpers.sortTransactionsDate(grouped)

      expect(sorted).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            date: expect.any(String),
            transactions: expect.any(Array),
          }),
        ])
      )
    })
  })
})
