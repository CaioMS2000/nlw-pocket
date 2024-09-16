const shellPid = process.argv[2]; // Captura o argumento passado na linha de comando
console.log(`PID do shell (processo pai): ${shellPid}`);
console.log(process.argv)