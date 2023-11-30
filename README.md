<div align="center">
    <img alt="nestjs-package-starter" width="250" height="auto" src="https://nestjs.com/img/logo_text.svg" />
</div>

# nestjs-collector

`nestjs-collector` is a NestJS package designed to dynamically collect and manage services marked as collectables within your application. This package facilitates the organization and validation of different services or components, allowing you to efficiently group and utilize them based on shared characteristics or tags.

## Features

- **Dynamic Collection**: Automatically collects services marked as collectables at runtime.
- **Tag-Based Organization**: Groups services based on specified tags, enabling modular and scalable architecture.
- **Runtime Efficiency**: Streamlines the process of managing similar services, reducing the need for manual aggregation.

## Installation

Install `nestjs-collector` into your NestJS project using npm or yarn:

```bash
npm install nestjs-collector
```

## Basic Usage

Below is a basic usage example demonstrating how to use `nestjs-collector` in a NestJS project.

### Implementing a Collectable Service

Create a service that you wish to be collected:

```typescript
// specific-rule.service.ts
import { Injectable } from '@nestjs/common';
import { Collectable } from 'nestjs-collector';

@Collectable('MyTag')
@Injectable()
export class SpecificRuleService {
  validate(): boolean {
    // Your validation logic here
    return true;
  }
}
```

### Creating a Collector Service

Define a collector service that will aggregate all collectables with the same tag:

```typescript
// rule-collector.service.ts
import { Injectable } from '@nestjs/common';
import { Collector, AbstractCollector } from 'nestjs-collector';
import { SpecificRuleService } from './specific-rule.service';

@Collector('MyTag')
@Injectable()
export class RuleCollectorService extends AbstractCollector<SpecificRuleService> {
  collect() {
    // Iterates over all collected services and applies their logic
    return this.collectables.every(rule => rule.validate());
  }
}
```

### Importing Collector Module

Ensure to import the `CollectorModule` in your main application module:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { CollectorModule } from 'nestjs-collector';
import { SpecificRuleService, RuleCollectorService } from './your-service-path';

@Module({
  imports: [CollectorModule],
  providers: [SpecificRuleService, RuleCollectorService],
})
export class AppModule {}
```

## How It Works

- **@Collectable Decorator**: Marks a service as collectable with a specified tag.
- **@Collector Decorator**: In a service extending `AbstractCollector`, aggregates all services marked as collectable with the matching tag.
- **Runtime Aggregation**: On application startup, `nestjs-collector` dynamically collects all instances of services tagged with the same identifier and makes them available in the collector service.

## Comprehensive Examples

For more in-depth examples, please refer to the `examples` folder in this repository. It contains extensive guides and practical use cases, demonstrating the versatile applications of `nestjs-collector`.

---

## Contributing

Contributions to `nestjs-collector` are highly appreciated. Please read our [contributing guidelines](CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the [MIT License](LICENSE).
