var bird = 'Pidgeons';
( function () {
    if ( typeof bird === 'undefined' ){       
        console.log('Ernie loves his ' + bird );
    } else {
        console.log('Bert loves his ' + bird );
    }
}() );