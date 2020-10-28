import { action } from '../action'

describe('action', () => {
  it('update', () => {
    action<number>(({ update }) => update(1)).start(v => expect(v).toBe(1))
  })

  it('complete', () => {
    action<number>(({ complete }) => complete()).start({ complete: () => expect(1).toBe(1) })
  })

  it('error', () => {
    action<number>(({ error }) => error('error!')).start({
      error: e => expect(e).toBe('error!'),
    })
  })
})
