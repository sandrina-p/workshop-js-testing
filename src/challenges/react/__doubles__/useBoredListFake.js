// 🍀 In React, Errors thrown inside a React Hook are automatically catched
// by React itself. So, using them in a hook fake is useless (the
// test would still pass).
// One solution is to log an error and return immediately

// This fake validates both the arguments passed (listType)
// And the mocked result (returnMock)
export default function useBoredListFake(returnMock) {
  return listType => {
    // 💡 Validate the listType passsed is "skipped" or "done"

    // if (...) {
    //   console.error(`useBoredList (stub) - Argument "${listType}" is invalid`)
    //   return
    // }

    // 💡 Validate the returnMock does not contain any key
    // besides "countLabel" and "clear"

    // if (...) {
    //   console.error(
    //     `useBoredListFake · The keys "${unexpectedKeys}" are unexpected.`
    //   )
    //   return
    // }

    return returnMock
  }
}
