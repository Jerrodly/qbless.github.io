#Uniqid & Time [#php#](/#php)

获取一个带前缀、基于当前时间微秒数的唯一ID
```
string uniqid ([ string $prefix = "" [, bool $more_entropy = false ]] )
```

## 2^20

uniqid 与 时间戳之间，到底是什么关系 ? 

将16进制的uniqid转换为10进制，然后除于2的20次方。这个时候，就可以得到对应的秒级时间戳
```
echo date('Y-m-d H:i:s',base_convert(uniqid(), 16, 10)/pow(2, 20));
```

## Guid

获取GUID一项，在我们日常开发中，还是非常经常被使用到的。

结合 uniqid 我们可以写一个支持高并发，并且长度相对较短，又可以做到逆推时间效果的功能。

```
/**
 * 结合uniqid，增加2个随机数，生成36位12长度的唯一码
 *
 * @return string GUID
 */
function getGuid() {
	$str = base_convert(uniqid(), 16, 36);
	$str .= base_convert(rand(0, 35), 10, 36);
	$str .= base_convert(rand(0, 35), 10, 36);
  return $str;
}
/**
 * 根据GUID获取生成时间
 *
 * @param  string @guid GUID
 * @return int time
 */
function getTimeByGuid($guid) {
  return (int) base_convert(substr($guid, 0, 10), 36, 10) / pow(2, 20);
}
```
