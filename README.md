# angular-schema-form-shamsidatepicker
this is a datepicker fo schema form rtl language 
example :

var form = [
                {
                        "type": "datepicker",
                        "key": "improver#cheque#date",
                        "validationMessage": "validationMessage({isEmpty: '', isJalaliDate: ''}) ",
                        "$validators": "validate({isEmpty: '', isJalaliDate: ''})",
                        "htmlClass": "schema_input_form",
                        "options": {
                          "minDate": "1360/01/01",
                          "maxDate": "1397/01/01"
                        }
                }
           ]
