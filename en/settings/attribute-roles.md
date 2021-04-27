---
layout: default
title: Attribute roles
parent: Settings
nav_order: 1
---

# Attribute Roles

Roles assign semantic meaning or technical roles to attributes. The platform catalog structure is 100% flexible and customizable to your needs. Now the system needs to learn which information is stored in which attributes.

* Which attributes stores the product name? (or gtin, price, ...)
* Which attributes should be used to decide if we have to create a new product or update an existing one during imports?

We solve this, by assigning roles, e.g. the attribute "name of product" need the role "product.name". Please ensure, that required roles are assigned correctly.

## Required Roles

|Role |Description |
--- | ---
|system.identifier | Identifier, in most cases the attribute that holds the SKU. Used in imports to decide if an existing product must be updated or new product will be created. Used in API to access single products.
|system.basecode | Identifier for main product. All product variants must share the same base code. All variants with same base code will be merged to one product (with variants).
|product.name | Primary product name. Will be used inside of app whenever we need to show the name.
|product.sku | Product stock keeping unit. Article number that must be unique for each product variants.
|product.image | Asset attribute that stores your product images.

## Semantic Roles

These roles are not strictly required, but help the system to map your data to formats as expected by target systems. You can ignore them during setup and we will ask you as soon as needed.
