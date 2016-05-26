{{~it.array :value:index}}

Use JavaScript to change the HTML content of the {{= value.elName}} element to "{{= value.helloWorld}}".

Hint: Use the document.getElementById() method to find the {{= value.elName}} element.
Then, use the innerHTML property to change its HTML content.

<!DOCTYPE html>
<html>
<body>

<{{! value.tagName }} id="demo">Hi.</{{! value.tagName }}>

<script>
// Add code here
</script>

</body>
</html>


{{~}}