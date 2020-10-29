// 💡💡💡
// In React, Errors thrown inside a React Hook are automatically catched
// by React itself. So, using them in a hook fake is useless (the
// test would still pass).
// One solution is to log an error and return immediately

export default function useBoredListFake(resultStub) {
  return listType => {
    // 🍀 Validate the listType passsed is "skipped" or "done"

    // if (...) {
    //   console.error(`useBoredList (stub) - Argument "${listType}" is invalid`)
    //   return
    // }

    // 🍀 Validate the resultStub does not receive any key
    // besides "countLabel" and "clear"

    // if (...) {
    //   console.error(
    //     `useBoredListFake · The keys "${unexpectedKeys}" are unexpected.`
    //   )
    //   return
    // }

    return resultStub
  }
}
