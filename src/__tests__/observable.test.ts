import { observable } from '../observable'

describe('observable', () => {
  it('update', () => {
    observable<number>(({ update }) => update(1)).start(v => expect(v).toBe(1))
  })

  it('complete', () => {
    observable<number>(({ complete }) => complete()).start({ complete: () => expect(1).toBe(1) })
  })

  it('error', () => {
    observable<number>(({ error }) => error('error!')).start({
      error: e => expect(e).toBe('error!'),
    })
  })
})
