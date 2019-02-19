# TsNullChecker README

TsNullChecker surrounds selected text with IF statement, that checks every expression part for undefined.

## Features

TsNullChecker surrounds selected text with IF statement, that checks every expression part for undefined.
```
// this selected code
this.dataSheetRef.dgDom.children[0].children[0].children[row].children[col + 1]
// will be transformed to this code
if (this.dataSheetRef
    && this.dataSheetRef.dgDom
    && this.dataSheetRef.dgDom.children[0]
    && this.dataSheetRef.dgDom.children[0].children[0]
    && this.dataSheetRef.dgDom.children[0].children[0].children[row]
    && this.dataSheetRef.dgDom.children[0].children[0].children[row].children[col + 1]) {
    this.dataSheetRef.dgDom.children[0].children[0].children[row].children[col + 1]
}
```
Run command `TsNullChecker: check for null` from command palette.
