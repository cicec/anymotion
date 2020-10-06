import { observable } from '../observable'

describe('observable', () => {
  it('should update', () => {
    observable<number>(({ update }) => update(1)).start(v => expect(v).toBe(1))
  })

  it('should complete', () => {
    observable<number>(({ complete }) => complete()).start({ complete: () => expect(1).toBe(1) })
  })
})
