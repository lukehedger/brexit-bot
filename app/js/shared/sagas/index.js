import * as dialogue from '../../dialogue'

export default function* rootSaga() {
  yield [
    dialogue.saga()
  ]
}
