
export class ParsedUserAgent{
  ua:string
  browser:Browser
  engine:Engine
  os:Os
  device:Device
  cpu:Cpu
}

class Browser{
  name:string
  version:string
  major:string
}

class Engine{
  name:string
  version:string
}

class Os{
  name:string
  version:string
}

class Device{
  vendor:any
  model:any
  type:any
}

class Cpu{
  architecture:string
}