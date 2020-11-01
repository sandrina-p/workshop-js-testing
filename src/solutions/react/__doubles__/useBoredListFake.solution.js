// 🍀 In React, Errors thrown inside a React Hook are catched
// automatically. So, using them is useless (the test would still pass).
// The only solution is to log the error and return immediately

export default function useBoredListFake(resultStub) {
  return listType => {
    // Validate the listType passsed is as expected
    const validListTypes = ['skipped', 'done']
    if (!validListTypes.includes(listType)) {
      console.error(`useBoredList (stub) - Argument "${listType}" is invalid`)
      return
    }

    // Validate the resultStub does not receive any unexpected key
    const { countLabel, clear, ...rest } = resultStub
    const unexpectedKeys = Object.keys(rest)

    if (unexpectedKeys.length > 0) {
      console.error(
        `useBoredListFake · The keys "${unexpectedKeys}" are unexpected.`
      )
      return
    }

    return resultStub
  }
}
